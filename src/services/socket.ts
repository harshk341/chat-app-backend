import { Server } from "socket.io";
import { logger } from "../helpers";

const onlineUser = new Map<string, string>();

export const initSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*" } });

  logger("✅socket setup");

  io.on("connection", (socket) => {
    logger("User connected: ", socket.id);

    socket.on("join", (userId: string) => {
      onlineUser.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUser.keys()));
    });

    socket.on("disconnect", () => {
      for (const [key, value] of onlineUser.entries()) {
        if (value === socket.id) {
          onlineUser.delete(key);
        }
      }
      io.emit("online-users", Array.from(onlineUser.keys()));
    });
  });
};
