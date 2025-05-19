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

type MessagePropsType = {
  message: string;
  self: boolean;
};

const Message = ({ message, self }: MessagePropsType) => {
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
const messages = messagesJSON as MessagePropsType[];

const ChatContainer = () => {
  const [inputMessage, setInputMessage] = React.useState("");

  return (
    <Sheet>
      <SheetTrigger>
        <BsChatRightDots className="size-5" />
      </SheetTrigger>
      <SheetContent className="w-full md:w-3/4">
        <SheetHeader>
          <SheetTitle className="text-xl md:text-2xl lg:text-3xl">
            Chat
          </SheetTitle>
          <SheetDescription>Only 10 messages are allowed.</SheetDescription>
        </SheetHeader>
        <div className="relative w-full overflow-y-scroll px-3 pt-6">
          {/* Chat messages */}
          <div className="flex flex-col gap-6">
            {messages.map((m, i) => (
              <Message key={i} message={m.message} self={m.self} />
            ))}
          </div>
          {/* Chat input */}
          <div className="sticky right-0 bottom-0 flex flex-col gap-3 bg-white px-3 py-1.5 pb-6">
            <div className="flex items-center gap-4">
              <Input
                value={inputMessage}
                onChange={(e) => {
                  if (e.target.value.length <= 256)
                    setInputMessage(e.target.value);
                }}
                className="px-3 py-1.5"
                placeholder="Enter message..."
              />
              <Button className="cursor-pointer">
                <IoSend className="size-5" />
              </Button>
            </div>
            {/* TODO: send button */}
            <span className="self-end text-gray-400">
              {inputMessage.length}/256
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatContainer;
