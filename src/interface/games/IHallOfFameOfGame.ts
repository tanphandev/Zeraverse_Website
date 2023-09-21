export interface IHallOfFameOfGame {
  created_at: string;
  game_detail_id: number;
  id: number;
  played_time: number;
  updated_at: string;
  user: {
    avatar: any;
    avatar_id: number;
    cover_id: number;
    created_at: string;
    email: string;
    highest_playstreak: number;
    id: number;
    is_active: boolean;
    phone_number: any;
    playtime: number;
    quote: string;
    ref_link: any;
    role: string;
    updated_at: string;
    username: string;
    zera: number;
  };
  user_id: number;
  zera_earned: number;
}
