export interface IHallOfFamePlayStreak {
  rank: number;
  user: {
    avatar: {
      category_item_id: number;
      created_at: string;
      discount: any;
      id: number;
      is_deleted: boolean;
      name: string;
      price: number;
      updated_at: string;
      url: string;
      value: string;
    };
    avatar_id: number;
    cover_id: any;
    created_at: string;
    email: string;
    hash_zera: string;
    highest_playstreak: number;
    id: number;
    is_active: true;
    password: string;
    phone_number: any;
    playtime: number;
    quote: string;
    ref_link: any;
    role: string;
    updated_at: string;
    username: string;
    zera: number;
  };
}
