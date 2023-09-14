export interface IHallOfFameZera {
  rank: number;
  total_earned_zera: string;
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
    username: string;
  };
  user_id: number;
}
