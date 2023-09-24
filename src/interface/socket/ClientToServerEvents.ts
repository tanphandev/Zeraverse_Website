interface ClientToServerEvents {
  //   loginAnonymous: (anonymous_id: string) => void;
  loginAnonymous: (data: { anonymous_id: string }) => void;
  playGame: () => void;
  stopPlay: () => void;
  joinRoom: (data: { room_id: number; token: string }) => void;
  chatMessage: (data: { msg: string }) => {};
}

//Socket Event
// export const SOCKET_EVENT = {
// 	ANONYMOUS_LOGIN: "loginAnonymous",
// 	LISTEN_MESSAGE: "message",
// 	LIST_USERS_JOIN_ROOM: "roomUsers",
// 	USER_JOIN_ROOM: "joinRoom",
// 	USER_LEAVE_ROOM: "leaveRoom",
// 	USER_SWITCH_GAME: "switchGame",
// 	USER_BUY_TIME: "userBuyTime",
// 	USER_DUPLICATE_LOGIN: "duplicateLogin",
// 	USER_STOP_PLAY: "stopPlay",
// 	USER_PLAY_GAME: "playGame",
// 	USER_SEND_MESSAGE: "chatMessage",
// 	OUT_OF_TIME: "outOfTime",
// 	SERVER_CONNECT_ERROR: "connect_error",
// 	SERVER_DISCONNECT: "disconnect",
// 	CONNECT_SUCCESS: "connectSuccess",
// 	PLAY_TIME: "playTime",
//   };
