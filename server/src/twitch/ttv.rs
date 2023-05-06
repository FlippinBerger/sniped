use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::env;
use std::error::Error;
use reqwest;

// API URLs 
const TOP_GAMES_URL: &str = "https://api.twitch.tv/helix/games/top";
const TOKEN_URL: &str = "https://id.twitch.tv/oauth2/token";
const GAME_URL: &str = "https://api.twitch.tv/helix/games?id=";
const STREAMS_URL: &str = "https://api.twitch.tv/helix/streams?game_id=";

pub struct Config {
    pub token: AccessToken,
    pub client_id: String,
}

// helper function to read in an env var or panic if it doesn't exist
// move to utils once db needs to do the same
fn read_required_env_var(s: &str) -> String {
    let res = env::var(s);
    match res {
        Ok(s) => s,
        Err(e) => panic!("couldn't get {} with err: {}", s, e)
    }
}

pub async fn setup() -> Result<Config, Box<dyn Error>> {
    let client_id = read_required_env_var("TTV_CLIENT_ID");
    let client_secret = read_required_env_var("TTV_CLIENT_SECRET");

    let mut map = HashMap::new();
    map.insert("client_id", &client_id[..]);
    map.insert("client_secret", &client_secret[..]);
    map.insert("grant_type", "client_credentials");

    let client = reqwest::Client::new();
    let res = client.post(TOKEN_URL)
        .json(&map)
        .send()
        .await?;
    let token: AccessToken = res.json().await?;
    println!("{:?}", token);

    Ok(Config {token, client_id: client_id.to_string()})
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Game {
    pub id: String,
    pub name: String,
    // 240x360 is a great starting point for size on these
    pub box_art_url: String,
    igdb_id: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct GamesResponse {
    data: Vec<Game>,
    pagination: Pagination,
}

pub async fn get_top_games(conf: &Config) -> Result<Vec<Game>, Box<dyn Error>> {
    let client = reqwest::Client::new();
    let req = client.request(reqwest::Method::GET, TOP_GAMES_URL)
        .header("Client-Id", conf.client_id.clone())
        .bearer_auth(conf.token.access_token.clone());

    let res: GamesResponse = req.send().await?.json().await?;

    Ok(res.data)
}

fn url_for_game<'a>(base: &str, game_id: usize) -> String {
   let mut s = base.to_owned();
   s.push_str(&game_id.to_string());

   s
}

#[derive(Deserialize, Debug, Serialize)]
struct GameResponse {
    data: Vec<Game>,
}

pub async fn get_streams_for_game(conf: &Config, game_id: usize) -> Result<GameStreams, Box<dyn Error>> {
    let client = reqwest::Client::new();

    let url = url_for_game(GAME_URL, game_id);
    println!("url for game is {}", url);

    let req = client.request(reqwest::Method::GET, url)
        .header("Client-Id", conf.client_id.clone())
        .bearer_auth(conf.token.access_token.clone());

    println!("built the req");

    let mut res: GameResponse = req.send().await?.json().await?;

    println!("got the GameResponse");

    if res.data.len() != 1 {
        return Err("List of games should be of length 1".into());
    }

    println!("after len check");

    let mut rv = GameStreams {
        game: res.data.remove(0),
        streams: vec![]
    };

    println!("building req to get streams");

    let url = url_for_game(STREAMS_URL, game_id);
    println!("streams url is {}", url);

    let req = client.request(reqwest::Method::GET, url)
        .header("Client-Id", conf.client_id.clone())
        .bearer_auth(conf.token.access_token.clone());

    println!("about to send req for streams");

    let res: StreamsForGameResponse = req.send().await?.json().await?;
    println!("got res for streams");
    rv.streams = res.data;

    Ok(rv)
}

#[derive(Deserialize, Debug)]
pub struct AccessToken {
    pub access_token: String,
    pub expires_in: u32,
    pub token_type: String,
}

#[derive(Deserialize, Debug, Serialize)]
struct StreamsForGameResponse {
    data: Vec<Stream>,
    pagination: Pagination,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct GameStreams {
    pub game: Game,
    pub streams: Vec<Stream>,
}

#[derive(Deserialize, Debug, Serialize)]
pub struct Stream {
    pub id: String,
    pub user_id: String, 
    pub user_login: String,
    pub user_name: String,
    pub game_id: String,
    pub game_name: String,

    #[serde(rename = "type")]
    pub ty: String,

    pub title: String,
    pub tags: Vec<String>,
    pub viewer_count: usize,
    pub started_at: String,
    pub language: String,
    pub thumbnail_url: String,
    pub tag_ids: Vec<String>,
    pub is_mature: bool,
}

#[derive(Deserialize, Debug, Serialize)]
struct Pagination {
    cursor: String,
}
