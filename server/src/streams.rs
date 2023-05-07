use crate::twitch::ttv;

use serde::{Deserialize, Serialize};
use std::error::Error;

// Service is used to house everything needed to call the external services
pub struct Service {
    ttv_config: Option<ttv::Config>,
}

impl Service {
    pub async fn build() -> Result<Service, Box<dyn Error>> {
        let ttv_config = ttv::setup().await?;

        Ok(Service {
            ttv_config: Some(ttv_config),
        })
    }

    pub async fn get_top_games(&self) -> Result<Vec<Game>, Box<dyn Error>> {
        let games: Vec<Game>;

        if let Some(ttv_conf) = &self.ttv_config {
            games = ttv::get_top_games(ttv_conf)
                .await?
                .into_iter()
                .map(|game| Game::from(game))
                .collect();
            return Ok(games);
        }

        // if let Some(yt_conf) = &self.yt_config {
        //     let yt_games = yt::get_top_games(yt_conf).await?.into_iter().map(|game| Game::from(game)).collect();
        //     games.append(yt_games);
        //     return Ok(games);
        // }

        Err("couldnt get twitch games".into())
    }

    pub async fn get_game(&self, id: usize) -> Result<GameStreams, Box<dyn Error>> {
        if let Some(ttv_conf) = &self.ttv_config {
            let ttv_game_streams = ttv::get_streams_for_game(ttv_conf, id).await;

            if let Ok(x) = ttv_game_streams {
                return Ok(GameStreams::from(x));
            }
        }

        Err("couldn't get game streams".into())
    }

    pub async fn search_games(&self, query: String) -> Result<Vec<Game>, Box<dyn Error>> {
        if let Some(ttv_conf) = &self.ttv_config {
            let games = ttv::search(ttv_conf, query)
                .await?
                .into_iter()
                .map(|game| Game::from(game))
                .collect();
            return Ok(games);
        }

        Err("search failed".into())
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
