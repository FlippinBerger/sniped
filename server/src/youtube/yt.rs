use reqwest;
use serde::{Deserialize, Serialize};
use std::env;
use std::error::Error;
use urlencoding::encode;

#[derive(Debug)]
pub struct Game {
    pub title: String,
    pub user_name: String,
    pub thumbnail_url: String,
    pub viewer_count: usize,
    pub game_name: String,
    pub started_at: String,
    pub stream_url: String,
}

struct Config {
    api_key: String,
}

pub struct Service {
    config: Config,
}

impl Service {
    // pub async fn get_streams_for_game(game: String) -> Result<Vec<Game>, Box<dyn Error>> {}
    pub fn build() -> Service {
        let api_key = env::var("YT_API_KEY").unwrap();

        Service {
            config: Config { api_key },
        }
    }

    pub async fn get_streams_for_game(&self, game: String) -> Result<Vec<Stream>, Box<dyn Error>> {
        let encoded_game = str::replace(&game, " ", "+");
        let full_html = fetch_html(encoded_game).await?;
        let video_ids = get_video_ids_from_html(&full_html, 20);

        let streams = self.get_streams(video_ids, game).await?;
        Ok(streams)
    }

    async fn get_streams(
        &self,
        ids: Vec<String>,
        game: String,
    ) -> Result<Vec<Stream>, Box<dyn Error>> {
        let ids = ids.join(",");
        let encoded_ids = encode(&ids);

        let url = format!("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CliveStreamingDetails&id={} Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key={}",
            encoded_ids, self.config.api_key);

        let client = reqwest::Client::new();
        let req = client.request(reqwest::Method::GET, url);

        let res: VideoListResponse = req.send().await?.json().await?;

        let streams: Vec<Stream> = res
            .items
            .into_iter()
            .map(|video: Video| Stream {
                user_id: video.snippet.channelId,
                user_name: video.snippet.channelTitle,
                game_name: game.clone(),
                title: video.snippet.title,
                tags: video.snippet.tags,
                viewer_count: video
                    .liveStreamingDetails
                    .concurrentViewers
                    .parse()
                    .unwrap_or(0),
                started_at: video.liveStreamingDetails.actualStartTime,
                language: video.snippet.defaultLanguage,
                thumbnail_url: video.snippet.thumbnails.high.url,
            })
            .collect();

        Ok(streams)
    }
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Stream {
    pub user_id: String,
    pub user_name: String,
    pub game_name: String,

    pub title: String,
    pub tags: Vec<String>,
    pub viewer_count: usize,
    pub started_at: String,
    pub language: String,
    pub thumbnail_url: String,
}

async fn fetch_html(game: String) -> Result<String, Box<dyn Error>> {
    let body = reqwest::get(format!(
        "https://www.youtube.com/results?search_query={}&sp=CAMSAkAB",
        game
    ))
    .await?
    .text()
    .await?;

    Ok(body)
}

// hacky af way to parse a given number of video ids out of the scraped webpage
// so that I can then use them to fetch from the Youtube API properly.
// will fetch up to count number of video ids from the block, or as many as
// there are in the html if there are < count results
fn get_video_ids_from_html(full_html: &str, count: usize) -> Vec<String> {
    let mut search_string = "itemSectionRenderer";
    let Some(i) = full_html.find(search_string) else {
        // TODO maybe think about different error handling rather than just
        // returning an empty vec
        return vec![];
    };

    let mut workable_slice = &full_html[i..];

    search_string = "contents";
    let Some(i) = workable_slice.find(search_string) else {
        //TODO same
        return vec![]
    };

    workable_slice = &workable_slice[i..];
    println!("{}", workable_slice);

    let mut video_ids: Vec<String> = Vec::new();
    let mut id: &str;

    // top level gets the next video block
    while let Some(i) = workable_slice.find("videoRenderer") {
        workable_slice = &workable_slice[i..];

        // get us to the id portion of the video that we care about
        let Some(i) = workable_slice.find("videoId") else {
            continue;
        };
        workable_slice = &workable_slice[i..];

        // 10 in is the start of the id string itself in the form of
        // videoId": "<id>"
        id = &workable_slice[10..];

        // find the end of the id string denoted by its closing double quote
        let Some(i) = id.find('"') else {
            continue;
        };
        id = &id[..i];

        video_ids.push(id.to_owned());

        if video_ids.len() >= count {
            break;
        }
    }

    video_ids
}

fn get_game_list_from_html() -> Vec<Game> {
    vec![Game {
        title: "".to_owned(),
        user_name: "".to_owned(),
        thumbnail_url: "".to_owned(),
        viewer_count: 0.to_owned(),
        game_name: "".to_owned(),
        started_at: "".to_owned(),
        stream_url: "".to_owned(),
    }]
}

// Note for me, can add tokio::test and then test async fns :)
#[ignore]
#[tokio::test]
async fn test_get_html() {
    let res = fetch_html("league+of+legends".to_owned()).await;
    match res {
        Ok(body) => println!("{}", body),
        Err(e) => println!("{:?}", e),
    }
}

// #[ignore]
#[tokio::test]
async fn game_list_fetching() {
    let res = fetch_html("league+of+legends".to_owned()).await;

    match res {
        Ok(body) => {
            println!(
                "here are the results:\n{:?}",
                get_video_ids_from_html(&body, 20)
            );
        }
        Err(e) => println!("error is {:?}", e),
    }
}

#[derive(Deserialize, Debug, Serialize)]
struct VideoListResponse {
    kind: String,
    etag: String,
    items: Vec<Video>,
    pageInfo: PageInfo,
}

#[derive(Deserialize, Debug, Serialize)]
struct PageInfo {
    totalResults: usize,
    resultsPerPage: usize,
}

#[derive(Deserialize, Debug, Serialize)]
struct Video {
    kind: String,
    etag: String,
    id: String,
    snippet: VideoSnippet,
    liveStreamingDetails: LiveStreamingDetails,
}

#[derive(Deserialize, Debug, Serialize)]
struct LiveStreamingDetails {
    actualStartTime: String,
    concurrentViewers: String,
    activeLiveChatId: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct VideoSnippet {
    publishedAt: String,
    channelId: String,
    title: String,
    description: String,
    thumbnails: Thumbnails,
    channelTitle: String,
    tags: Vec<String>,
    categoryId: String,
    liveBroadcastContent: String,
    defaultLanguage: String,
    localized: String,
    defaultAudioLanguage: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct Localized {
    title: String,
    description: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct Thumbnails {
    default: Thumbnail,
    medium: Thumbnail,
    high: Thumbnail,
    standard: Thumbnail,
    maxres: Thumbnail,
}

#[derive(Deserialize, Debug, Serialize)]
struct Thumbnail {
    url: String,
    width: usize,
    height: usize,
}
