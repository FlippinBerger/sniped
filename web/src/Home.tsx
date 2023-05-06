import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import apiClient from './api/client';
import { Game } from './types';
import { getImageUrl } from './utils';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);

  useQuery('popular_games', async () => {
    return await apiClient.get("/popular");
  },
    {
      onSuccess: (res) => {
        console.log("games: ", res.data);
        setGames(res.data);
      },
      onError: (err) => {
        console.log("something happened when fetching top games", err);
      },
    });

  return (
    <div css={pageWrapper}>
      <h2>Popular games:</h2>

      <div css={gameList}>
        {/* {testGames.map((game: Game) => ( */}
        {games.map((game: Game) => (
          <div key={game.id} css={gameCard}>
            <Card sx={{ maxWidth: 240 }}>
              <CardActionArea component={Link} to={`/game/${game.ttv_id}`}>
                <CardMedia
                  sx={{ height: 360 }}
                  image={getImageUrl(game.box_art_url, 240, 360)}
                  title={game.name}
                />
                <CardContent css={cardBackground}>
                  <Typography variant='h4'>
                    {game.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
};

export default Home;

const pageWrapper = css({
  padding: '48px 0 0 32px',
  width: '100vw',
  height: '100vh',
});

const gameList = css({
  display: 'flex',
  gap: "24px",
});

const gameCard = css({
  minWidth: "240px",
});

const cardBackground = css({
  backgroundColor: '#242424',
  color: 'white',
  textAlign: 'center',
});

// const testGames: Game[] = [{"id":"509658","name":"Just Chatting","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg","igdb_id":""},{"id":"263490","name":"Rust","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/263490_IGDB-{width}x{height}.jpg","igdb_id":"3277"},{"id":"21779","name":"League of Legends","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/21779-{width}x{height}.jpg","igdb_id":"115"},{"id":"27471","name":"Minecraft","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/27471_IGDB-{width}x{height}.jpg","igdb_id":"121"},{"id":"516575","name":"VALORANT","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/516575-{width}x{height}.jpg","igdb_id":"126459"},{"id":"32982","name":"Grand Theft Auto V","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-{width}x{height}.jpg","igdb_id":"1020"},{"id":"29595","name":"Dota 2","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/29595-{width}x{height}.jpg","igdb_id":"2963"},{"id":"460637","name":"Dead Island 2","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/460637_IGDB-{width}x{height}.jpg","igdb_id":"7329"},{"id":"32399","name":"Counter-Strike: Global Offensive","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-{width}x{height}.jpg","igdb_id":"1372"},{"id":"33214","name":"Fortnite","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/33214-{width}x{height}.jpg","igdb_id":"1905"},{"id":"511224","name":"Apex Legends","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/511224-{width}x{height}.jpg","igdb_id":"114795"},{"id":"460630","name":"Tom Clancy's Rainbow Six Siege","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/460630_IGDB-{width}x{height}.jpg","igdb_id":"7360"},{"id":"18122","name":"World of Warcraft","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/18122-{width}x{height}.jpg","igdb_id":"123"},{"id":"29452","name":"Virtual Casino","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/29452_IGDB-{width}x{height}.jpg","igdb_id":"45517"},{"id":"513143","name":"Teamfight Tactics","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/513143-{width}x{height}.jpg","igdb_id":"120176"},{"id":"512710","name":"Call of Duty: Warzone","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/512710-{width}x{height}.jpg","igdb_id":"131800"},{"id":"27546","name":"World of Tanks","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/27546-{width}x{height}.jpg","igdb_id":"1184"},{"id":"138585","name":"Hearthstone","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/138585_IGDB-{width}x{height}.jpg","igdb_id":"1279"},{"id":"491487","name":"Dead by Daylight","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/491487-{width}x{height}.jpg","igdb_id":"18866"},{"id":"515025","name":"Overwatch 2","box_art_url":"https://static-cdn.jtvnw.net/ttv-boxart/515025-{width}x{height}.jpg","igdb_id":"125174"}]
