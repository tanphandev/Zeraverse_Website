export interface IPopularGame {
  game_detail_id: number;
  total_playtime: string;
  game_detail: {
    id: number;
    title: string;
    seo_title: string;
    seo_description: string;
    slug: string;
    thumbnail: string;
    play_url: string;
    trailer_url: any;
    category_id: number;
    screen_mode: string;
    developer: string;
    description: string;
    instruction: any;
    vendor: string;
    love_count: any;
    superslug_id: number;
    tilegrid: number;
    grid_index: any;
    created_at: string;
    updated_at: string;
    superslug: {
      id: number;
      code: string;
      label: string;
      value: string;
      description: string;
      created_at: string;
      updated_at: string;
    };
  };
}
