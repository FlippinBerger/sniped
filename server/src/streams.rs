use crate::twitch::ttv;
use crate::youtube::yt;

use serde::{Deserialize, Serialize};
use std::error::Error;

// Service is used to house everything needed to call the external services
pub struct Service {
    ttv: ttv::Service,
    yt: yt::Service,
}

impl Service {
    pub async fn build() -> Result<Service, Box<dyn Error>> {
        let ttv = ttv::Service::build().await?;
        let yt = yt::Service::build();

        Ok(Service { ttv, yt })
    }

    pub async fn get_top_games(&self) -> Result<Vec<Game>, Box<dyn Error>> {
        let games: Vec<Game>;

        games = self
            .ttv
            .get_top_games()
            .await?
            .into_iter()
            .map(|game| Game::from(game))
            .collect();

        Ok(games)
    }

    pub async fn get_streams_for_game(&self, id: usize) -> Result<GameStreams, Box<dyn Error>> {
        let ttv_game_streams = self.ttv.get_streams_for_game(id).await?;
        println!("got game streams from twitch {:?}", ttv_game_streams);

        let mut rv = GameStreams::from(ttv_game_streams);

        let yt_res = self.yt.get_streams_for_game(rv.game.name.clone()).await;

        match yt_res {
            Ok(yt_streams) => {
                println!("before adding to rv: {:?}", rv);
                rv.add_yt_streams(yt_streams);
                println!("after adding to rv: {:?}", rv);
                Ok(rv)
            }
            Err(e) => {
                println!("error fetching yt streams: {:?}", e);
                Ok(rv)
            }
        }
    }

    pub async fn search_games(&self, query: String) -> Result<Vec<Game>, Box<dyn Error>> {
        let games = self
            .ttv
            .search(query)
            .await?
            .into_iter()
            .map(|game| Game::from(game))
            .collect();
        Ok(games)
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub struct GameStreams {
    game: Game,
    streams: Vec<Stream>,
}

impl From<ttv::GameStreams> for GameStreams {
    fn from(game_streams: ttv::GameStreams) -> Self {
        let streams = game_streams
            .streams
            .into_iter()
            .map(|stream| Stream::from(stream))
            .collect();

        Self {
            game: Game::from(game_streams.game),
            streams,
        }
    }
}

impl GameStreams {
    fn add_yt_streams(&mut self, v: Vec<yt::Stream>) {
        let mut streams: Vec<Stream> = v.into_iter().map(|stream| Stream::from(stream)).collect();
        self.streams.append(&mut streams);

        // sort the streams by viewer count in descending order
        self.streams
            .sort_unstable_by(|a, b| b.viewer_count.cmp(&a.viewer_count));
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Game {
    id: usize,
    ttv_id: String,
    // yt_id: usize,
    name: String,
    box_art_url: String,
}

impl From<ttv::Game> for Game {
    fn from(game: ttv::Game) -> Self {
        Self {
            id: 0,
            ttv_id: game.id,
            name: game.name,
            box_art_url: game.box_art_url,
        }
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub enum Origin {
    TTV,
    YT,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Stream {
    pub origin: Origin,
    pub title: String,
    pub user_name: String,
    pub tags: Vec<String>,
    pub thumbnail_url: String,
    pub language: String,
    pub viewer_count: usize,
    pub game_name: String,
    pub started_at: String,
    pub stream_url: String,
}

impl From<ttv::Stream> for Stream {
    fn from(stream: ttv::Stream) -> Self {
        Self {
            // game: Game::from(stream.game),
            origin: Origin::TTV,
            user_name: stream.user_name.clone(),
            game_name: stream.game_name,
            title: stream.title,
            tags: stream.tags,
            viewer_count: stream.viewer_count,
            started_at: stream.started_at,
            language: stream.language,
            thumbnail_url: stream.thumbnail_url,
            stream_url: format!("https://twitch.tv/{}", stream.user_name),
        }
    }
}

impl From<yt::Stream> for Stream {
    fn from(stream: yt::Stream) -> Self {
        Self {
            origin: Origin::YT,
            user_name: stream.user_name,
            game_name: stream.game_name,
            title: stream.title,
            tags: stream.tags,
            viewer_count: stream.viewer_count,
            started_at: stream.started_at,
            language: stream.language,
            thumbnail_url: stream.thumbnail_url,
            stream_url: stream.stream_url,
        }
    }
}
