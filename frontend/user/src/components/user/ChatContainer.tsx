import React from "react";

import { BsChatRightDots } from "react-icons/bs";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import messagesJSON from "../../../__data/messages.json";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoSend } from "react-icons/io5";
import { useSocket } from "@/lib/hooks";
import { useSelector } from "react-redux";
import type { StoreState } from "@/features/store";
import { useFetchSkillswapSessionChatQuery } from "@/features/skillswap-session/skillswapSessionApi";
import SkeletonLoader from "../utils/SkeletonLoader";

type SkillswapSessionChatMessage = {
  message: string;
  self: boolean;
};

const Message = ({ message, self }: SkillswapSessionChatMessage) => {
  return (
    <div
      className={cn(
        "w-1/2 rounded-2xl px-3 py-1.5",
        self
          ? "bg-primary/10 text-primary ml-auto"
          : "mr-auto bg-gray-100 text-gray-900",
      )}
    >
      {message}
    </div>
  );
};

// NOTE: Mock data
const messages = messagesJSON as SkillswapSessionChatMessage[];

const ChatContainer: React.FC<{ sessionId: string }> = ({ sessionId }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<SkillswapSessionChatMessage[]>(
    [],
  );
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  const userId = useSelector((store: StoreState) => store.session.user?.id);

  const socket = useSocket();

  const { data, isLoading, isError } =
    useFetchSkillswapSessionChatQuery(sessionId);

  // Load initial messages
  React.useEffect(() => {
    if (data)
      setMessages(
        data.map((message) => ({
          message: message.content,
          self: message.senderId === userId,
        })),
      );
  }, [data]);

  // To auto scroll to bottom
  React.useEffect(() => {
    // chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  React.useEffect(() => {
    if (!socket) return;

    socket.emit("ss-session-join", sessionId);

    socket.on(
      "ss-session-receive",
      ({ senderId, message }: { senderId: string; message: string }) => {
        setMessages((prev) => [
          ...prev,
          {
            message,
            self: senderId === userId,
          },
        ]);
      },
    );

    return () => {
      socket.off("ss-session-receive");
    };
  }, [socket, sessionId]);

  const handleSend = () => {
    if (message && socket) {
      socket?.emit("ss-session-send", { sessionId, message });
      setMessage("");
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
        <BsChatRightDots className="size-5" />
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col md:w-3/4">
        <SheetHeader>
          <SheetTitle className="text-xl md:text-2xl lg:text-3xl">
            Chat
          </SheetTitle>
          <SheetDescription>Only 10 messages are allowed.</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="flex w-full flex-col gap-6 px-3 pt-6">
            {Array.from({ length: 10 }, (_, i) => (
              <SkeletonLoader
                className={cn(
                  "h-12 w-1/2 rounded-2xl",
                  i % 2 ? "ml-auto" : "mr-auto",
                )}
              />
            ))}
          </div>
        ) : isError ? (
          <div className="min-h-screen w-full text-2xl font-light text-red-500">
            Something went wrong
          </div>
        ) : (
          <div className="relative flex w-full flex-1 flex-col overflow-y-auto px-3 pt-6">
            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="mb-28 flex flex-col gap-6 overflow-y-scroll"
            >
              {messages.map((m, i) => (
                <Message key={i} message={m.message} self={m.self} />
              ))}
              {/* Invisible div to scroll to */}
              {/* <div ref={container} /> */}
            </div>
            {/* Chat input */}
            <div className="absolute right-0 bottom-0 left-0 flex flex-col gap-3 bg-white px-3 py-1.5 pt-3 pb-6">
              <div className="flex items-center gap-4">
                <Input
                  disabled={messages.length > 10}
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= 256)
                      setMessage(e.target.value);
                  }}
                  className="px-3 py-1.5"
                  placeholder="Enter message..."
                />
                <Button
                  disabled={messages.length > 10}
                  onClick={handleSend}
                  className="cursor-pointer"
                >
                  <IoSend className="size-5" />
                </Button>
              </div>
              <span className="self-end text-gray-400">
                {message.length}/256
              </span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ChatContainer;
