"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Socket, io } from "socket.io-client";
import { HANDLE_STATUS, VERIFY_STATUS } from "@/utils/constants";
import { config } from "@/envs/env";
import { useAuthContext } from "./AuthContextProvider";
import { getTimeRemaining, isLogged } from "@/utils/helper";

type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  setSocket: React.Dispatch<
    React.SetStateAction<Socket<
      ServerToClientEvents,
      ClientToServerEvents
    > | null>
  >;
  connectStatusOfSocket: HANDLE_STATUS;
  setConnectStatusOfSocket: React.Dispatch<React.SetStateAction<HANDLE_STATUS>>;
  isConnectSocket: boolean;
  setIsConnectSocket: React.Dispatch<React.SetStateAction<boolean>>;
  isCountdown: boolean;
  setIsCountdown: React.Dispatch<React.SetStateAction<boolean>>;
  playedTime: number;
  setPlayedTime: React.Dispatch<React.SetStateAction<number>>;
  remainingTime: TIME_COUNTER_TYPE;
  setRemainingTime: React.Dispatch<React.SetStateAction<TIME_COUNTER_TYPE>>;
};

export type TIME_COUNTER_TYPE = {
  days: string | number;
  hours: string | number;
  isTimeOut: boolean;
  minutes: string | number;
  seconds: string | number;
  time: number;
};
const DEFAULT_TIME = {
  days: "00",
  hours: "01",
  isTimeOut: false,
  minutes: "00",
  seconds: "00",
  time: 3600000,
};
const SocketContext = createContext(null as any);
export const useSocketContext = () => {
  const socketContext = useContext(SocketContext) as SocketContextType;
  if (!socketContext) {
    throw new Error(
      "useSocketContext() can only be used inside of <SocketContextProvider />, " +
        "please declare it at a higher level."
    );
  }
  return useMemo(() => ({ ...socketContext }), [socketContext]);
};

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [connectStatusOfSocket, setConnectStatusOfSocket] =
    useState<HANDLE_STATUS>(HANDLE_STATUS.NOT_START);
  const [isConnectSocket, setIsConnectSocket] = useState<boolean>(false);
  const [isCountdown, setIsCountdown] = useState(false);
  const [remainingTime, setRemainingTime] =
    useState<TIME_COUNTER_TYPE>(DEFAULT_TIME);
  const [playedTime, setPlayedTime] = useState<number>(0);
  const [newMessage, setNewMessage] = useState();
  const {
    anonymousInfo,
    anonymousStatus,
    verifyStatus,
    userInfo,
    setUserInfo,
    setAnonymousInfo,
  } = useAuthContext();

  // console.log("isConnectSocket", isConnectSocket);
  // console.log("connectStatusOfSocket", connectStatusOfSocket);
  // console.log("socket", socket);

  /* clear state */
  const clearState = () => {
    console.log("clear state");
    setIsCountdown(false);
    // setIsJoinedRoom(false);
    setConnectStatusOfSocket(HANDLE_STATUS.NOT_START);
    setPlayedTime(0);
  };

  /* check status socket to init connection or disconnect */
  useEffect(() => {
    if (isConnectSocket) {
      const socketInstance = io(config["SERVER_SOCKET"]);
      setSocket(socketInstance);
      setConnectStatusOfSocket(HANDLE_STATUS.IN_PROGRESS);
    }
    if (!isConnectSocket && socket) {
      socket.disconnect();
      clearState();
    }
  }, [isConnectSocket]);

  // on event of user logged
  useEffect(() => {
    if (!socket || verifyStatus !== VERIFY_STATUS.SUCCESS) return;

    socket.on("message", (data) => {
      console.log("data message", data);
      if (!data) return;
      if (data.is_message) {
        // setSendMessageStatus(STATUS.SUCCESS);
        setNewMessage(data);
      }
      //  else {
      //   setSystemMessage(data);
      //   // bonus zera for current user
      //   if (data?.user?.id === userInfo?.id && data?.zera) {
      //     setUserInfo((prev) => ({
      //       ...prev,
      //       zera: (+prev?.zera || 0) + (+data?.zera || 0),
      //     }));
      //   }
      // }
    });

    // socket.on(SOCKET_EVENT.USER_DUPLICATE_LOGIN, () => {
    //   router.push({ pathname: staticPaths.home, query: { isDuplicate: true } });
    // });
  }, [socket, verifyStatus]);

  /*  emit anonymous login */
  useEffect(() => {
    if (
      !socket ||
      connectStatusOfSocket !== HANDLE_STATUS.SUCCESS ||
      anonymousStatus !== HANDLE_STATUS.SUCCESS
    )
      return;
    const { uid } = anonymousInfo ?? {};
    if (uid) {
      console.log("login with anonymouse with id", uid);
      socket.emit("loginAnonymous", { anonymous_id: uid });
    }
  }, [socket, connectStatusOfSocket, anonymousStatus]);

  // set remaining time
  useEffect(() => {
    const remainingTime =
      verifyStatus === VERIFY_STATUS.SUCCESS
        ? userInfo?.playtime
        : anonymousStatus === HANDLE_STATUS.SUCCESS
        ? anonymousInfo?.playtime
        : 0;
    const remainingTimeFormat = getTimeRemaining(remainingTime as number);
    setRemainingTime(remainingTimeFormat);
  }, [
    verifyStatus,
    anonymousStatus,
    anonymousInfo?.playtime,
    userInfo?.playtime,
  ]);

  /* listen server event */
  useEffect(() => {
    if (!socket) return;
    socket.on("playTime", (data) => {
      const { remaining_time, played_time } = data ?? {};
      setPlayedTime((prev) => prev + 1);
      (isLogged() ? setUserInfo : setAnonymousInfo)((prev: any) => ({
        ...prev,
        playtime: remaining_time || 0,
      }));
    });

    socket.on("connectSuccess", () => {
      setConnectStatusOfSocket(HANDLE_STATUS.SUCCESS);
    });

    socket.on("connect_error", (e: any) => {
      console.error("socket connection error:", e?.message);
      setConnectStatusOfSocket(HANDLE_STATUS.FAIL);
      setIsCountdown(false);
    });

    socket.on("disconnect", () => {
      console.log("server disconnect");
      setConnectStatusOfSocket(HANDLE_STATUS.NOT_START);
      setIsCountdown(false);
    });
  }, [socket]);

  const socketContextData: SocketContextType = useMemo(
    () => ({
      socket,
      setSocket,
      connectStatusOfSocket,
      setConnectStatusOfSocket,
      isConnectSocket,
      setIsConnectSocket,
      isCountdown,
      setIsCountdown,
      playedTime,
      setPlayedTime,
      remainingTime,
      setRemainingTime,
    }),
    [
      socket,
      setSocket,
      connectStatusOfSocket,
      setConnectStatusOfSocket,
      isConnectSocket,
      setIsConnectSocket,
      isCountdown,
      setIsCountdown,
      playedTime,
      setPlayedTime,
      remainingTime,
      setRemainingTime,
    ]
  );
  return (
    <SocketContext.Provider value={socketContextData}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
