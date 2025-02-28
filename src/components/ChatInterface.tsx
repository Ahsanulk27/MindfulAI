import React, { useState, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import type { Message } from "../types";

/** Minimal decode example. Adjust if your token uses different fields. */
function decode(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

type ChatInterfaceProps = {
  socket: any; // Replace with the specific Socket.IO client type if desired
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  function formatTextToHTML(text) {
    // Replace **text** with <strong>text</strong> for section headers
    text = text.replace(/\*\*(.*?)\*\*/gs, "<strong>$1</strong>");

    // Convert text to HTML paragraphs and list items
    let formattedText = "";
    let lines = text.split("\n"); // Split the text into lines

    // Process each line
    for (let line of lines) {
      if (line.trim().length === 0) continue; // Skip empty lines

      if (line.trim().startsWith("*")) {
        // Handle lines that start with '*', treating them as list items
        formattedText += `<li>${line.trim().substring(1).trim()}</li>`;
      } else {
        // Other lines are treated as paragraphs
        // Close any open list with </ul> before starting a new paragraph
        if (formattedText.endsWith("</li>")) {
          formattedText += "</ul>";
        }
        formattedText += `<p>${line.trim()}</p>`;
        // Start a new list if the next line is a bullet point
        if (
          lines.indexOf(line) < lines.length - 1 &&
          lines[lines.indexOf(line) + 1].trim().startsWith("*")
        ) {
          formattedText += "<ul>";
        }
      }
    }

    // Close any open list tags at the end of the text
    if (formattedText.endsWith("</li>")) {
      formattedText += "</ul>";
    }

    return formattedText;
  }
  const token = localStorage.getItem("token");

  /**
   * 1) On mount, emit `initChatSession` with our token.
   *    Then handle the server's initChatSessionResponse to set up state.
   * 2) Also listen for `messageResponse` to update messages when the server
   *    sends new chat data.
   */
  useEffect(() => {
    if (!socket) return;

    // If we have a token, ask the server to init or retrieve a session
    if (token) {
      console.log("[Client] Emitting initChatSession with token");
      socket.emit("initChatSession", token);
    } else {
      console.warn("[Client] No token found in localStorage");
    }

    // Server’s response to initChatSession
    const handleInitResponse = (payload: any) => {
      if (payload.error) {
        console.error("[initChatSessionResponse] Error:", payload.error);
      } else {
        console.log("[initChatSessionResponse] Got session:", payload);
        setSessionId(payload.sessionId);
        setMessages(payload.chat || []);
      }
    };

    // Server’s response with updated chat
    const handleMessageResponse = (chat: Message[]) => {
      console.log("[messageResponse] Updating chat:", chat);
      setMessages(chat);
      setIsTyping(false);
    };

    socket.on("initChatSessionResponse", handleInitResponse);
    socket.on("messageResponse", handleMessageResponse);

    // Cleanup on unmount
    return () => {
      socket.off("initChatSessionResponse", handleInitResponse);
      socket.off("messageResponse", handleMessageResponse);
    };
  }, [socket, token]);

  /**
   * 2) Check the last *non-"Ignore"* message to determine if the send button 
   *    should be disabled.
   */
  useEffect(() => {
    if (messages.length === 0) return;

    const lastRealMessage = [...messages].reverse().find((m) => m.name !== "Ignore");
    if (lastRealMessage) {
      // If the last *visible* message is from user, disable send
      setIsDisabled(lastRealMessage.role === "user");
    }
  }, [messages]);

  /**
   * 3) Sending a new message. We pass the sessionId (if we have one)
   *    and the userToken so the server can create or retrieve the session as needed.
   */
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    // Make sure the token has userId
    const decodedToken = token ? decode(token) : null;
    if (!decodedToken || !decodedToken.userId) {
      console.error("[Client] Invalid token or missing userId property");
      return;
    }

    // Build the user’s message
    const newMessage: Message = {
      id: sessionId || null, // If we don't have a sessionId yet, can be null
      date: new Date(),
      name: "User",
      role: "user",
      parts: [{ text: input }],
      // You can pass any additional fields as needed for your server
      // e.g. userToken, etc.
    };

    // Update UI immediately
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    // Send to server. The server expects { id: <sessionId>, userToken, parts, role } ...
    socket.emit("message", {
      ...newMessage,
      userToken: token, // So the server can decode the user again
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* CHAT DISPLAY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) =>
          msg.name === "Ignore" ? null : (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
                dangerouslySetInnerHTML={{
                  __html: formatTextToHTML(msg.parts[0]?.text),
                }}
              >
     
              </div>
            </div>
          )
        )}

        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
      </div>

      {/* MESSAGE INPUT */}
      <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Mic className="w-5 h-5" />
          </button> */}

          {/* If last real message is from user, disable the send button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`p-2 text-white rounded-lg transition-colors ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            <div className="inline-flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Send</span>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};
