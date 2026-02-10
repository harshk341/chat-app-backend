import { Server } from "socket.io";
import { logger } from "../helpers";
import Message from "../models/Message";

const onlineUser = new Map<string, string>();

export const initSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: "*" } });

  logger("✅socket setup");

  io.on("connection", (socket) => {
    logger("User connected: ", socket.id, new Date().toLocaleTimeString());

    socket.on("join", (userId: string) => {
      onlineUser.set(userId, socket.id);
      io.emit("online-users", Array.from(onlineUser.keys()));
    });

    socket.on("disconnect", () => {
      logger("User disconnected: ", socket.id, new Date().toLocaleTimeString());

      for (const [key, value] of onlineUser.entries()) {
        if (value === socket.id) {
          onlineUser.delete(key);
        }
      }
      io.emit("online-users", Array.from(onlineUser.keys()));
    });

    socket.on("send-message", async ({ sender, receiver, content }) => {
      const message = await Message.create({ sender, receiver, content });

      const receiverSocketId = onlineUser.get(receiver);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiver-message", message);
      }

      socket.emit("receiver-message", message);
    });
  });
};
