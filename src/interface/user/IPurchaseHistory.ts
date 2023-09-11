import { IAvatarInventory } from "./IAvatarInventory";
import { ICoverInventory } from "./ICoverInventory";

export default interface IPurchaseHistory {
  avatar: IAvatarInventory[];
  cover: ICoverInventory[];
}
