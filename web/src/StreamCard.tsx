import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from '@mui/material';

import { Stream } from './types';
import { getImageUrl } from './utils';

interface StreamProps {
  stream: Stream;
};

const StreamCard = (props: StreamProps) => {
  return (
    <div css={card}>
      <div css={videoWrapper}>
        <img src={getImageUrl(props.stream.thumbnail_url, 360, 240)} css={video} />
        <Chip label={props.stream.origin} variant='filled' css={origin} />
        <Chip label={`${props.stream.viewer_count} viewers`} variant='filled' css={viewers} />
      </div>
      <div css={textBlock}>
        <p css={textLine}><b>{props.stream.title}</b></p>
        <p css={textLine}>{props.stream.user_name}</p>
        <p css={textLine}>{props.stream.game_name}</p>
      </div>
    </div>
  )
};

export default StreamCard;

const card = css({
  padding: '8px 0',
  // width: '100vw',
  // height: '360px',
  // display: 'flex',
  // flexDirection: 'column',
});

const videoWrapper = css({
  position: 'relative',
});

const video = css({
  // position: 'relative',
  // top: 0,
});

const origin = css({
  position: 'absolute',
  top: 8,
  left: 4,
});

const viewers = css({
  position: 'absolute',
  bottom: 8,
  left: 4,
});

const textBlock = css({
  // display: 'flex',
  // flexDirection: 'column',
  // justifyContent: 'center',
  // height: '100px',
  display: 'block',
});

const textLine = css({
  margin: 0,
  inlineSize: '360px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// const cardBackground = css({
//   backgroundColor: '#242424',
//   color: 'white',
//   textAlign: 'center',
// });
