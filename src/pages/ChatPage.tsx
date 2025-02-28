import React, { useEffect } from "react";
import { ChatInterface } from "../components/ChatInterface";
import { Dispatch, SetStateAction } from "react";
import socketIO from "socket.io-client";

type ChatPageProps = {
  socket: any | null;
  setSocket: Dispatch<SetStateAction<any | null>>;
};

export const ChatPage: React.FC<ChatPageProps> = ({ socket, setSocket }) => {
  useEffect(() => {
    // Only run once to establish the socket connection
    const newSocket = socketIO("https://api.malaysiabdmartshop.com", {
      // Pass any options here, e.g. transports if needed
      // transports: ["websocket", "polling"], etc.
    });
    setSocket(newSocket);

    // Cleanup: disconnect on unmount to avoid multiple connections
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Chat with MindfulAI
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Share your thoughts, feelings, or concerns with our AI companion. We're
        here to listen, provide support, and offer guidance.
      </p>
      <ChatInterface socket={socket} />
    </div>
  );
};
