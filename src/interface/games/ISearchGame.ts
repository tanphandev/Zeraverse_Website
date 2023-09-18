import IGame from "./IGame";
import { IGameCategory } from "./IGameCategory";

export interface ISearchGame {
  category: IGameCategory[];
  game: any[];
  gameByCategory: IGame[];
}
