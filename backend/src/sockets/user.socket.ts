import { Server, Socket } from "socket.io";
import prisma from "../db/client";

/** Takes an io server and handles event handlers and emissions related to skillswap sessions. */
export const skillswapSessionChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const user = socket.user;

    socket.on("ss-session-join", (sessionId: string) => {
      socket.join(sessionId);
      console.log(`${user?.name} joined ${sessionId}`);
    });

    socket.on(
      "ss-session-send",
      async (
        { sessionId, message }: { sessionId: string; message: string },
        cb: any
      ) => {
        if (!sessionId || !message || !user) return;

        const chatMessages = await prisma.skillSwapSessionChatMessage.count({
          where: {
            senderId: user.id,
            skillswapSessionId: sessionId,
          },
        });

        if (chatMessages > 10) {
          cb({
            error: "Cannot have more than 10 messages per person",
            success: false,
          });
        }

        await prisma.skillSwapSession.update({
          where: {
            id: sessionId,
          },
          data: {
            chatMessages: {
              create: {
                senderId: user.id,
                content: message,
              },
            },
          },
        });

        io.to(sessionId).emit("ss-session-receive", {
          senderId: user?.id,
          message,
        });
        cb({ success: true });
      }
    );

    socket.on("disconnect", () => {
      console.log(`${user?.name} disconnected`);
    });
  });
};
