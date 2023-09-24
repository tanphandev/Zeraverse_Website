interface ServerToClientEvents {
  connectSuccess: () => void;
  connect_error: (e: any) => void;
  disconnect: () => void;
  playTime: (data: any) => void;
  message: (data: any) => void;
}
//Socket Event
// export const SOCKET_EVENT = {
//   ANONYMOUS_LOGIN: "loginAnonymous",
//   LISTEN_MESSAGE: "message",
//   LIST_USERS_JOIN_ROOM: "roomUsers",
//   USER_JOIN_ROOM: "joinRoom",
//   USER_LEAVE_ROOM: "leaveRoom",
//   USER_SWITCH_GAME: "switchGame",
//   USER_BUY_TIME: "userBuyTime",
//   USER_DUPLICATE_LOGIN: "duplicateLogin",
//   USER_STOP_PLAY: "stopPlay",
//   USER_PLAY_GAME: "playGame",
//   USER_SEND_MESSAGE: "chatMessage",
//   OUT_OF_TIME: "outOfTime",
//   SERVER_CONNECT_ERROR: "connect_error",
//   SERVER_DISCONNECT: "disconnect",
//   CONNECT_SUCCESS: "connectSuccess",
//   PLAY_TIME: "playTime",
// };
