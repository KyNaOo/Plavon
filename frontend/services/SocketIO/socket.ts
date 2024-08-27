import React from "react";
import { io, Socket } from "socket.io-client";

const backendURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const socket: Socket = io(backendURL);

export const SocketContext = React.createContext(socket);
export const useSocket = () => React.useContext(SocketContext);