import { css } from '@emotion/react';
import Grid from '@mui/material/Unstable_Grid2';

import { Stream } from './types';
import StreamCard from './StreamCard';

interface StreamGridProps {
  streams: Stream[];
};

const StreamGrid = (props: StreamGridProps) => {
  let streams = props.streams;
  // streams = testData;
  return (
    <div css={pageWrapper}>
      <Grid container spacing={2}>
        {streams.map((stream: Stream) => (
          <Grid xs={4}>
            <StreamCard stream={stream} />
            {/* <Card sx={{ maxWidth: 360 }}> */}
            {/*   <CardActionArea component={Link} to={stream.stream_url}> */}
            {/*     <CardMedia */}
            {/*       sx={{ height: 240 }} */}
            {/*       image={getImageUrl(stream.thumbnail_url, 360, 240)} */}
            {/*       title={stream.title} */}
            {/*     /> */}
            {/*     <CardContent css={cardBackground}> */}
            {/*       <Typography variant='h4'> */}
            {/*         {stream.title} */}
            {/*       </Typography> */}
            {/*       <Typography variant='h5'> */}
            {/*         {stream.user_name} */}
            {/*       </Typography> */}
            {/*     </CardContent> */}
            {/*   </CardActionArea> */}
            {/* </Card> */}
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default StreamGrid;

const pageWrapper = css({
  padding: '48px 0 0 32px',
  width: '100vw',
  height: '100vh',
});

const testData: Stream[] = [{ "origin": "TTV", "title": "Korea Bootcamp Day 2 - live laugh love gaslight gatekeep girlboss", "user_name": "Doublelift", "tags": ["English"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_doublelift-{width}x{height}.jpg", "language": "en", "viewer_count": 8227, "game_name": "League of Legends", "started_at": "2023-05-06T00:56:46Z", "stream_url": "https://twitch.tv/Doublelift" }, { "origin": "TTV", "title": "#SB3 Dia 8 Solo Q 😎😎😎", "user_name": "Josedeodo", "tags": ["Español"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_josedeodo-{width}x{height}.jpg", "language": "es", "viewer_count": 7472, "game_name": "League of Legends", "started_at": "2023-05-06T00:49:53Z", "stream_url": "https://twitch.tv/Josedeodo" }, { "origin": "TTV", "title": "5/6 《魔靈召喚：克羅尼柯戰記》++  !海外熊寶賣場 !vpn", "user_name": "NeVeR_LosEs", "tags": ["中文", "八強", "好熊寶", "愛熊熊"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_never_loses-{width}x{height}.jpg", "language": "zh", "viewer_count": 3392, "game_name": "League of Legends", "started_at": "2023-05-06T03:31:38Z", "stream_url": "https://twitch.tv/NeVeR_LosEs" }, { "origin": "TTV", "title": "Primer stream del año en el ciber.", "user_name": "CrystalMolly", "tags": ["Lgbtqiaplus", "Español"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_crystalmolly-{width}x{height}.jpg", "language": "es", "viewer_count": 3163, "game_name": "League of Legends", "started_at": "2023-05-06T01:48:35Z", "stream_url": "https://twitch.tv/CrystalMolly" }, { "origin": "TTV", "title": "KOREA TRYHARD | 3 SUB TIER LISTS | !patreon for coaching", "user_name": "tarzaned", "tags": ["Challenger", "Rank1", "English"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_tarzaned-{width}x{height}.jpg", "language": "en", "viewer_count": 3026, "game_name": "League of Legends", "started_at": "2023-05-06T01:36:37Z", "stream_url": "https://twitch.tv/tarzaned" }, { "origin": "TTV", "title": "#SB3 DIA 8 | LA MIRACLE RUN NUNCA FUE TAN REAL | !juegalo !bcgame @rakyzlol en redes", "user_name": "Rakyz", "tags": ["Español"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_rakyz-{width}x{height}.jpg", "language": "es", "viewer_count": 2693, "game_name": "League of Legends", "started_at": "2023-05-06T03:28:11Z", "stream_url": "https://twitch.tv/Rakyz" }, { "origin": "TTV", "title": "QUEBRAREMOS A MALDIÇÃO DOS 1400 PDL || !jogo !bcgame !mobalytics #ad !curso !musica", "user_name": "Ayellol", "tags": ["Ayel", "Tipspace", "Toplane", "English", "lol", "leagueoflegends", "Português"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_ayellol-{width}x{height}.jpg", "language": "pt", "viewer_count": 2522, "game_name": "League of Legends", "started_at": "2023-05-05T22:28:58Z", "stream_url": "https://twitch.tv/Ayellol" }, { "origin": "TTV", "title": "SOLOQZINHA BRABA", "user_name": "ookina", "tags": ["Português"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_ookina-{width}x{height}.jpg", "language": "pt", "viewer_count": 1958, "game_name": "League of Legends", "started_at": "2023-05-06T01:27:24Z", "stream_url": "https://twitch.tv/ookina" }, { "origin": "TTV", "title": "Do you know the time? I wanna know the exact moment I got a crush on you. - Day 126 - Nick at Night !gsupps", "user_name": "Quantum", "tags": ["English"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_quantum-{width}x{height}.jpg", "language": "en", "viewer_count": 1927, "game_name": "League of Legends", "started_at": "2023-05-06T00:00:01Z", "stream_url": "https://twitch.tv/Quantum" }, { "origin": "TTV", "title": "마딱이 때리기", "user_name": "앰비션_", "tags": ["한국어"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_lol_ambition-{width}x{height}.jpg", "language": "ko", "viewer_count": 1702, "game_name": "League of Legends", "started_at": "2023-05-06T03:53:26Z", "stream_url": "https://twitch.tv/앰비션_" }, { "origin": "TTV", "title": "Fx Brance diretamente do ct da T1", "user_name": "DiegoBrance", "tags": ["Português"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_diegobrance-{width}x{height}.jpg", "language": "pt", "viewer_count": 1661, "game_name": "League of Legends", "started_at": "2023-05-06T04:04:49Z", "stream_url": "https://twitch.tv/DiegoBrance" }, { "origin": "TTV", "title": "FULL FOCUS 🍀La Comarca🍀!youtube", "user_name": "DuendePablo", "tags": ["LaComarca", "Español"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_duendepablo-{width}x{height}.jpg", "language": "es", "viewer_count": 1506, "game_name": "League of Legends", "started_at": "2023-05-06T02:41:40Z", "stream_url": "https://twitch.tv/DuendePablo" }, { "origin": "TTV", "title": "gameplay adulta ✅ selvageria ✅ talento ✅ inteligencia incomparavel ✅ cabelo de sobra ✅ destreza ✅ habilidades motoras ✅", "user_name": "shinimon", "tags": ["Português"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_shinimon-{width}x{height}.jpg", "language": "pt", "viewer_count": 1467, "game_name": "League of Legends", "started_at": "2023-05-06T00:27:12Z", "stream_url": "https://twitch.tv/shinimon" }, { "origin": "TTV", "title": "GOLD !SUBWARS LIVE!! Order: Gold > Silver/Bronze/Iron > Plat/Diamond+| 300 LP START RIP BEING HELD BACK | @trick2g", "user_name": "Trick2g", "tags": ["udyr", "LoL", "Toplane", "communitygames", "Volibear", "English", "Speedrun"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_trick2g-{width}x{height}.jpg", "language": "en", "viewer_count": 1457, "game_name": "League of Legends", "started_at": "2023-05-05T19:17:33Z", "stream_url": "https://twitch.tv/Trick2g" }, { "origin": "TTV", "title": "best shaco world - !blitz #ad !fullgame !hybrid", "user_name": "PinkWardlol", "tags": ["Bisexual", "Shaco", "league", "leagueoflegends", "pinkward", "English"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_pinkwardlol-{width}x{height}.jpg", "language": "en", "viewer_count": 992, "game_name": "League of Legends", "started_at": "2023-05-05T23:02:42Z", "stream_url": "https://twitch.tv/PinkWardlol" }, { "origin": "TTV", "title": "MSI 2023 - PLAY IN - DAY 4 - BO3", "user_name": "otplol_", "tags": ["Esport", "Français"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_otplol_-{width}x{height}.jpg", "language": "fr", "viewer_count": 929, "game_name": "League of Legends", "started_at": "2023-05-05T16:25:05Z", "stream_url": "https://twitch.tv/otplol_" }, { "origin": "TTV", "title": "Soloq na smurf 🤡 !redesocial", "user_name": "RodiL", "tags": ["MoBA", "LGBTQ", "Brocha", "Idoso", "Gostoso", "Português", "proplayer"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_rodil-{width}x{height}.jpg", "language": "pt", "viewer_count": 851, "game_name": "League of Legends", "started_at": "2023-05-05T22:41:18Z", "stream_url": "https://twitch.tv/RodiL" }, { "origin": "TTV", "title": "VUELVE EL SHOW DE COMEDIA YA TERMINO EL TUKI PARA MI #LEAGUEPARTNER🔷🚨100 mil Seguidores=Extensible sin limites🚨🔷", "user_name": "JimRsNg", "tags": ["Nuevo", "Humor", "Clip", "World", "MazodeTrundle", "Jim", "JimRising", "Noseterminalosjuegos", "multiplayer", "Español"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_jimrsng-{width}x{height}.jpg", "language": "es", "viewer_count": 849, "game_name": "League of Legends", "started_at": "2023-05-05T23:07:15Z", "stream_url": "https://twitch.tv/JimRsNg" }, { "origin": "TTV", "title": "ZONGOAT le maudit", "user_name": "ZONGOLED0Z0", "tags": ["Français"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_zongoled0z0-{width}x{height}.jpg", "language": "fr", "viewer_count": 810, "game_name": "League of Legends", "started_at": "2023-05-05T17:34:00Z", "stream_url": "https://twitch.tv/ZONGOLED0Z0" }, { "origin": "TTV", "title": "EM BUSCA DAS CAMERAS / JUNGLER CHALLENGER", "user_name": "4LaNlol", "tags": ["Português"], "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_4lanlol-{width}x{height}.jpg", "language": "pt", "viewer_count": 767, "game_name": "League of Legends", "started_at": "2023-05-06T03:20:53Z", "stream_url": "https://twitch.tv/4LaNlol" }];
