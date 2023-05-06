export interface Game {
  id: number,
  ttv_id: string,
  name: string,
  // 240x360 is a great starting point for size on these
  box_art_url: string,
  igdb_id?: string,
};

export interface Stream {
  origin: string,
  user_name: string,
  game_name: string,
  title: string,
  tags: string[],
  viewer_count: number,
  started_at: string,
  language: string,
  thumbnail_url: string,
  stream_url: string,
};

export interface GameData {
  game: Game,
  streams: Stream[],
};
