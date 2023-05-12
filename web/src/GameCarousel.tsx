import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import { Game } from './types';
import { getImageUrl } from './utils';

interface CarouselProps {
  games: Game[]
};

const GameCarousel = (props: CarouselProps) => {
  return (
    <div css={gameList}>
      {props.games.map((game: Game) => (
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
  )
};

export default GameCarousel;

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
