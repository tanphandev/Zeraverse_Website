export interface IAvatarShop {
  url: string;
  id: number;
  name: string;
  price: number;
  discount: string | null;
  value: string;
  is_deleted: boolean;
  category_item_id: number;
  created_at: string;
  updated_at: string;
  user_inventory: {
    id: number;
    user_id: number;
    item_id: number;
    created_at: string;
    updated_at: string;
  };
}
