"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import {
  gameCategoriesSelector,
  gamePopularSelector,
} from "@/store/selectors/game.selector";
import { userRecentlyGameSelector } from "@/store/selectors/userSelector";
import SearchInput from "./SearchInput";
import SearchSuggest from "./SearchSuggest";
import PopularGame from "./PopularGame";
import RecentlyPlayedGame from "./RecentlyPlayedGame";
import * as gameService from "@/services/game.service";
import * as userService from "@/services/user.service";
import { IGameCategory } from "@/interface/games/IGameCategory";
import "@/styles/custom.scss";
import { IPopularGame } from "@/interface/games/IPopularGame";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import IGame from "@/interface/games/IGame";
import { useDebounce } from "@/hooks/useDebounce";
import { ISearchGame } from "@/interface/games/ISearchGame";
import SearchResult from "./SearchResult";

function SearchModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ISearchGame | null>(null);
  const { closeModalWithAnimation } = useModalContext();
  const searchModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useAuthContext();
  const gameCategories = useSelector<RootState>(
    gameCategoriesSelector
  ) as IGameCategory[];
  const popularGames =
    (useSelector<RootState>(gamePopularSelector) as IPopularGame[]) ?? [];
  const recentlyPlayedGame =
    (useSelector<RootState>(userRecentlyGameSelector) as IGame[]) ?? [];
  const handleCloseSearchModal = () => {
    closeModalWithAnimation(500);
  };
  useOnClickOutside(searchModalRef, handleCloseSearchModal);

  /* search */
  const debounceValue = useDebounce(searchValue, 1000);
  useEffect(() => {
    if (!debounceValue.trim()) return;
    setIsLoading(true);
    gameService
      .searchGame(debounceValue.trim())
      .then((result) => {
        setIsLoading(false);
        setSearchResult(result);
      })
      .catch((e: any) => {
        setIsLoading(false);
        throw e;
      });
  }, [debounceValue]);

  /* get categories game, popular game, recently played game*/
  useEffect(() => {
    !gameCategories && dispatch(gameService.getGameCategories({}));
    dispatch(gameService.getPopularGame({}));
  }, []);

  /* get  recently played game */
  useEffect(() => {
    dispatch(userService.getUserRecentlyGame(userInfo?.username!!));
  }, [userInfo]);
  return (
    <div className="seach-wapper fixed top-0 right-0 bottom-0 z-50 left-0 bg-main-grayColor-50 backdrop-blur-sm animate-fadeIn">
      <div
        ref={searchModalRef}
        id="modal"
        className="relative search-box transition-transform bg-main-violet-c4-50 inline-block pl-[27px] pr-[17px] h-full animate-slipLeftToRight"
      >
        <SearchInput
          isLoading={isLoading}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSearchResult={setSearchResult}
        />
        {!!searchValue ? (
          <SearchResult searchResult={searchResult} />
        ) : (
          <>
            <SearchSuggest
              suggestList={gameCategories}
              setSearchValue={setSearchValue}
            />
            <PopularGame popularGameList={popularGames} />
            <RecentlyPlayedGame recentlyPlayedGameList={recentlyPlayedGame} />
          </>
        )}
      </div>
    </div>
  );
}
export default SearchModal;
