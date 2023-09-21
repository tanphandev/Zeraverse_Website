import { createRef, useEffect, useRef, useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import { useModalContext } from "@/contexts/ModalContextProvider";
import { useOnClickOutside } from "@/hooks/useClickOutSide";
import * as userService from "@/services/user.service";
import XmarkICon from "@/asset/icons/XmarkIcon";
import AddPlayListIcon from "@/asset/icons/AddPlayListIcon";
import DeleteIcon from "@/asset/icons/DeleteIcon";
import { AddPlayListInput } from "./AddPlayListInput";
import { useAuthContext } from "@/contexts/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { userPlayListGameSelector } from "@/store/selectors/userSelector";
import IPlayListGame from "@/interface/user/IPlayListGame";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "@/utils/constants";
import { gameInfoOfGameDetailSelector } from "@/store/selectors/game.selector";
import { IGameDetail } from "@/interface/games/IGameDetail";

function AddPlayListModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [toggleShowInput, setToggleShowInput] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string>("");
  const addPlayListInputref = createRef<any>();
  const addPlayListRef = useRef<HTMLDivElement>(null);
  const { userInfo } = useAuthContext();
  const { closeModalWithAnimation } = useModalContext();
  const userPlaylistGame = useSelector<RootState>(
    userPlayListGameSelector
  ) as IPlayListGame[];
  const gameDetail =
    (useSelector<RootState>(gameInfoOfGameDetailSelector) as IGameDetail) ??
    null;
  useOnClickOutside(addPlayListRef, () => {
    closeModalWithAnimation(150);
  });

  const closeModal = () => {
    closeModalWithAnimation(150);
  };

  /* get playlist of user with game slug */
  useEffect(() => {
    userInfo?.username &&
      dispatch(
        userService.getUserPlaylistGameWithGameSlug({
          username: userInfo?.username,
          game_slug: gameDetail?.slug,
        })
      );
  }, [userInfo?.username]);

  /* create playlist */
  const handleAddPlaylist = (playlistName: string) => {
    userService
      .addPlaylistgame(playlistName)
      .then(({ success }) => {
        if (success) {
          addPlayListInputref.current.resetValue();
          setToggleShowInput(false);
          dispatch(
            userService.getUserPlaylistGameWithGameSlug({
              username: userInfo?.username!!,
              game_slug: gameDetail?.slug,
            })
          );
          toast.success(TOAST_MESSAGE.ADD_PLAYLIST_SUCCESS, {
            position: "top-right",
          });
        }
      })
      .catch((e: any) => {
        console.log("e", e);
        toast.error(e?.message, { position: "top-right" });
        throw e;
      });
  };

  /* delete playlist */
  const handleDeletePlaylist = (playlistId: string) => {
    userService
      .deleteUserPlayListGame(parseInt(playlistId))
      .then(({ success }) => {
        if (success) {
          dispatch(
            userService.getUserPlaylistGameWithGameSlug({
              username: userInfo?.username!!,
              game_slug: gameDetail?.slug,
            })
          );
        }
      })
      .catch((e: any) => {
        toast.error(e?.message);
        throw e;
      });
  };

  /* add game into playlist */

  const handleAddGameIntoPlaylist = (
    game_detail_id: number,
    playlist_id: string
  ) => {
    userService
      .addGameIntoPlayList(game_detail_id, playlist_id)
      .then(() => {
        dispatch(
          userService.getUserPlaylistGameWithGameSlug({
            username: userInfo?.username!!,
            game_slug: gameDetail?.slug,
          })
        );
      })
      .catch((e: any) => {
        toast.error(e?.message, { position: "top-right" });
        throw e;
      });
  };

  /* delete game out of playlist */
  const handleDeleteGameOutOfPlaylist = (
    playlist_id: number,
    game_detail_id: number
  ) => {
    userService
      .getUserPlayListItem(playlist_id)
      .then(({ success, data: gamesOfPlayList }) => {
        if (success) {
          console.log("ITem of PlayList", gamesOfPlayList);
          const getGameId = (gamesOfPlayList: any[]) => {
            for (const item of gamesOfPlayList) {
              if (item?.game_detail_id === game_detail_id) return item?.id;
              return null;
            }
          };
          const gameId = getGameId(gamesOfPlayList);
          !!gameId &&
            userService
              .deleteUserPlayListItemGame(gameId)
              .then(({ success }) => {
                if (success) {
                  dispatch(
                    userService.getUserPlaylistGameWithGameSlug({
                      username: userInfo?.username!!,
                      game_slug: gameDetail?.slug,
                    })
                  );
                }
              })
              .catch((e: any) => {
                toast.error(e?.message, { position: "top-right" });
                throw e;
              });
        }
      })
      .catch((e: any) => {
        throw e;
      });
  };
  return (
    <div className="z-10 flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-main-whileColor-30">
      <div
        id="modal"
        ref={addPlayListRef}
        className="add-playlist-modal transition-all absolute w-[540px] h-[450px] px-5 pb-5 text-main-whileColor font-lato flex flex-col items-center rounded-[30px] border-[3px] bg-gradient-to-b from-[#570426] to-[#270010] border-main-pink-f4 "
      >
        <XmarkICon
          onClick={closeModal}
          width="20px"
          height="20px"
          className="absolute top-[20px] right-[30px] p-[3px] cursor-pointer text-main-pink-f4 hover:text-main-pink-be transition-colors outline-none"
        />

        <div className="font-lato text-main-whileColor w-full">
          <div className="w-full text-center mt-[20px]">
            <h2 className="font-semibold inline text-center px-[30px] py-[5px] bg-main-pink-83 border-[1px] border-main-pink-ec rounded-[10px] mt-[8px] mb-[24px] shadow-[0px_2px_6px] shadow-[#EC4899]">
              Playlist
            </h2>
          </div>
          <div className="flex justify-end mt-2 mb-2">
            <button
              onClick={() => {
                setToggleShowInput(!toggleShowInput);
                addPlayListInputref.current.resetValue();
                addPlayListInputref.current.focusInput();
              }}
              className="flex items-center"
            >
              <AddPlayListIcon
                className="inline mr-1"
                width="20px"
                height="20px"
                fill="#ffffff"
              />
              New List
            </button>
          </div>
          <div className="h-[300px] overflow-y-scroll no-scrollbar">
            <AddPlayListInput
              ref={addPlayListInputref}
              isShow={toggleShowInput}
              hideInput={setToggleShowInput}
              handleOnSubmit={handleAddPlaylist}
            />
            {userPlaylistGame?.map((playlistItem, index) => (
              <div
                key={index}
                className="flex justify-between h-[60px] bg-main-violet-4c pl-2 pl-3 rounded-[10px] shadow-md shadow-[#00000040] my-1"
              >
                <div className="flex items-center text-base font-nunito font-medium">
                  {playlistItem?.name}
                </div>
                <div className="flex items-center">
                  <div className="p-3 flex items-center">
                    <TippyHeadless
                      render={(attrs) => (
                        <div
                          className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[5px]"
                          tabIndex={-1}
                          {...attrs}
                        >
                          {playlistItem?.is_added
                            ? "Remove To Playlist"
                            : "Add To Playlist"}
                        </div>
                      )}
                      placement="bottom"
                    >
                      <AddPlayListIcon
                        className="mr-3 cursor-pointer outline-none"
                        onClick={() => {
                          playlistItem?.is_added
                            ? handleDeleteGameOutOfPlaylist(
                                parseInt(playlistItem.id),
                                gameDetail?.id
                              )
                            : handleAddGameIntoPlaylist(
                                gameDetail?.id,
                                playlistItem?.id
                              );
                        }}
                        width="24px"
                        height="24px"
                        fill={playlistItem?.is_added ? "#31fa2f" : "#ffffff"}
                      />
                    </TippyHeadless>
                    {idSelected === playlistItem?.id ? (
                      <TippyHeadless
                        render={(attrs) => (
                          <div
                            className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[5px]"
                            tabIndex={-1}
                            {...attrs}
                          >
                            Cancel
                          </div>
                        )}
                        placement="bottom"
                      >
                        <XmarkICon
                          className="transition-colors hover:text-main-pink-be p-[3px] outline-none"
                          width="20px"
                          height="20px"
                          onClick={() => {
                            setIdSelected("");
                          }}
                        />
                      </TippyHeadless>
                    ) : (
                      <TippyHeadless
                        render={(attrs) => (
                          <div
                            className="flex items-center text-main-whileColor text-sm font-medium py-1 px-3 bg-[#424242] rounded-[5px]"
                            tabIndex={-1}
                            {...attrs}
                          >
                            Detele Playlist
                          </div>
                        )}
                        placement="bottom"
                      >
                        <DeleteIcon
                          className="transition-colors hover:text-main-pink-be cursor-pointer outline-none"
                          width="20px"
                          height="20px"
                          onClick={() => {
                            setIdSelected(playlistItem?.id);
                          }}
                        />
                      </TippyHeadless>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      handleDeletePlaylist(playlistItem?.id);
                    }}
                    className={`${
                      idSelected === playlistItem?.id ? "w-[100px] p-2" : "w-0"
                    } transition-all duration-400 flex justify-center items-center h-full  bg-[#C00000] rounded-r-[10px] cursor-pointer`}
                  >
                    <DeleteIcon
                      className={`${
                        idSelected === playlistItem?.id ? " mr-1" : "hidden"
                      }`}
                      width="20px"
                      height="20px"
                    />
                    <p
                      className={`${
                        idSelected === playlistItem?.id ? "" : "hidden"
                      } text-base font-lato font-medium text-main-whileColor`}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlayListModal;
