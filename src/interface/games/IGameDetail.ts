import { IGameCategory } from "./IGameCategory";
export interface IGameDetail {
  category_id: number;
  created_at: string;
  description: string;
  developer: string;
  game_category: IGameCategory;
  game_tags: any;
  grid_index: string;
  id: number;
  instruction: string;
  love_count: number;
  play_url: string;
  screen_mode: string;
  seo_description: string;
  seo_title: string;
  slug: string;
  superslug: any;
  superslug_id: number;
  thumbnail: string;
  tilegrid: number;
  title: string;
  trailer_url: string;
  updated_at: string;
  vendor: string;
}
