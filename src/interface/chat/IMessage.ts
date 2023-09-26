import { IUserInfo } from "../user/IUserInfo";
export interface IMessage {
  created_at: string;
  game_detail_id: number;
  id: number;
  is_message: boolean;
  message: string;
  updated_at: string;
  user: IUserInfo;
  user_id: number;
}
