"use client";
import Language from "@/components/chat/Language";
import Messages from "@/components/chat/Messages";
import SendMessage from "@/components/chat/SendMessage";
import Username from "@/components/chat/Username";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.once("messages-old", (data) => {
      setMessages((msg) => [msg, ...data] as any);
    });

    socket.on("chat-message", (data) => {
      setMessages((msg) => [...msg, data] as any);
    });
  }, []);

  return (
    <div>
      <h1>Chat</h1>
      <Language socket={socket} setLanguage={setLanguage} />
      <Username socket={socket} setUsername={setUsername} />
      <SendMessage socket={socket} username={username} />
      <Messages messages={messages} username={username} />
    </div>
  );
};

export default Chat;
