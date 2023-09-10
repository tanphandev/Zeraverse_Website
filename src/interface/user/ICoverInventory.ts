export interface ICoverInventory {
  created_at: string;
  id: number;
  item_id: number;
  item_info: {
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
  updated_at: string;
  user_id: number;
}
