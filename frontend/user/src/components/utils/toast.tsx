import React from "react";
import ReactDOM from "react-dom";
import { IoIosCheckmarkCircle, IoIosWarning } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdError } from "react-icons/md";

// types
type ToastMessageType = "success" | "info" | "error" | "warning";

interface ToastMessage {
  type?: ToastMessageType;
  message: string;
}

// constants
const TOAST_MESSAGE_DURATION_MS = 1500;

// const MESSAGE_TYPE_STYLES: {
//   [K in ToastMessageType]: any;
// } = {
//   info: "bg-blue-500",
//   success: "bg-green-500",
//   error: "bg-red-500",
//   warning: "bg-orange-500",
// };

const MESSAGE_TYPE_ICONS: {
  [K in ToastMessageType]: React.ReactNode;
} = {
  info: <IoInformationCircleSharp className="size-5" />,
  success: <IoIosCheckmarkCircle className="size-5" />,
  error: <MdError className="size-5" />,
  warning: <IoIosWarning className="size-5" />,
};

/** Individual message component */
const Toast: React.FC<{
  message: ToastMessage["message"];
  type?: ToastMessageType;
  onRemove: () => void;
}> = ({ message, type = "info", onRemove }) => {
  const [fade, setFade] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setFade(true), TOAST_MESSAGE_DURATION_MS);
    const removeTimer = setTimeout(onRemove, TOAST_MESSAGE_DURATION_MS + 500);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onRemove]);

  return (
    <div
      className={`relative w-64 transform rounded-sm p-3 text-white transition-all duration-200 ${
        type === "info"
          ? "bg-blue-500"
          : type === "success"
            ? "bg-green-500"
            : type === "error"
              ? "bg-red-500"
              : type === "warning"
                ? "bg-orange-500"
                : "bg-black"
      } ${fade ? "translate-x-full opacity-0" : "opacity-100"}`}
    >
      <div className="flex items-center justify-between">
        {MESSAGE_TYPE_ICONS[type]}
        <div className="mx-auto">{message}</div>
      </div>
      <div
        style={{
          //   transition: `all ${TOAST_MESSAGE_DURATION_MS}ms ease-in`,
          animation: `ToastProgress ${TOAST_MESSAGE_DURATION_MS}ms linear forwards`,
        }}
        className="absolute inset-x-0 bottom-1 h-1 w-full bg-white"
      ></div>
    </div>
  );
};

/** Displays all messages */
const ToastContainer: React.FC<{
  messages: ToastMessage[];
  onRemove: (index: number) => void;
}> = ({ messages, onRemove }) => {
  return (
    <div className="pointer-events-none fixed top-4 right-4 z-[999] flex flex-col gap-3">
      {messages.map((m, i) => (
        <Toast
          key={i}
          message={m.message}
          type={m.type}
          onRemove={() => onRemove(i)}
        />
      ))}
    </div>
  );
};

const ToastContext = React.createContext<null | {
  pushToastMessage: (message: ToastMessage) => void;
  //   removeMessage: (index: number) => void;
}>(null);

/** context provider for toast manipulation */
export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [messages, setMessages] = React.useState<ToastMessage[]>([]);

  const pushMessage = React.useCallback((message: ToastMessage) => {
    setMessages((m) => [...m, message]);
    // setTimeout(() => removeMessage(messages.length), TOAST_MESSAGE_DURATION_MS);
  }, []);

  //   const popMessage = () => {
  //     setMessages((m) => m.slice(1));
  //   };

  const removeMessage = (index: number) => {
    setMessages((m) => m.filter((_, i) => i !== index));
  };

  return (
    <ToastContext.Provider
      value={{
        pushToastMessage: pushMessage,
        // removeMessage,
      }}
    >
      {children}
      {ReactDOM.createPortal(
        <ToastContainer
          messages={messages}
          onRemove={(index) => removeMessage(index)}
        />,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

/** hook for context */
export const useToast = () => {
  const ctx = React.useContext(ToastContext);

  if (ctx === null) {
    throw new Error("'useToast' cannot be used outside 'ToastProvider'");
  }

  return ctx;
};
