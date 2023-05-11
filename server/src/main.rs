use std::process;

use rocket::serde::json::Json;
use rocket::State;
use rocket::{get, launch, routes};
use rocket_cors::Cors;

use rusty::streams;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

fn get_cors() -> Cors {
    rocket_cors::CorsOptions {
        ..Default::default()
    }
    .to_cors()
    .unwrap()
}

#[launch]
async fn rocket() -> _ {
    let service = streams::Service::build().await;

    match service {
        Ok(service) => {
            println!("service has been created");

            rocket::build()
                .manage(service)
                .mount("/", routes![index])
                .mount("/", routes![get_top_games])
                .mount("/", routes![get_game])
                .mount("/", routes![search])
                .attach(get_cors())
        }
        Err(err) => {
            println!("an error occurred {:?}", err);
            process::exit(1);
        }
    }
}

// gets the top games
#[get("/popular")]
async fn get_top_games(service: &State<streams::Service>) -> Json<Vec<streams::Game>> {
    let games = service.get_top_games().await;

    match games {
        Ok(games) => Json(games),
        Err(_) => Json(vec![]),
    }
}

#[get("/game/<id>")]
async fn get_game(
    service: &State<streams::Service>,
    id: usize,
) -> Option<Json<streams::GameStreams>> {
    let game_streams = service.get_streams_for_game(id).await;

    if let Ok(gs) = game_streams {
        return Some(Json(gs));
    }

    println!("couldn't get game streams from twitch");
    None
}

#[get("/search/<query>")]
async fn search(service: &State<streams::Service>, query: String) -> Json<Vec<streams::Game>> {
    let games = service.search_games(query).await;
    match games {
        Ok(games) => Json(games),
        Err(err) => {
            println!("err: {:?}", err);
            Json(vec![])
        }
    }
}
