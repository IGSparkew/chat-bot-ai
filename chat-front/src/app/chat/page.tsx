"use client";
import { IMessage } from "@/components/chat/Message";
import Messages from "@/components/chat/Messages";
import SendMessage from "@/components/chat/SendMessage";
import Username from "@/components/chat/Username";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.once("messages-old", (data) => {
      setMessages((msg) => [...msg, ...data] as any);
    });

    socket.on("chat-message", (data) => {
      setMessages((msg) => [...msg, data] as any);
    });

    socket.on("message-trad", (data) => {
      setMessages((msg) => {
        const updatedMessage = msg.map((m: IMessage) => {
          if (m.id === data.id) {
            m.content = data.content;
          }
          return m as any;
        });

        return updatedMessage as any;
      })

      
    })
  }, []);

  const hadUsername = username.length > 0;

  return (
    <div>
      <h1>Chat</h1>
      {
        !hadUsername && <Username socket={socket} setUsername={setUsername} />
      }
      {
        hadUsername && <h2>Username: {username}</h2>
      }

      { 
        hadUsername && <SendMessage socket={socket} username={username} />
      }
      
       <Messages socket={socket} messages={messages} username={username}/>
    

      
    </div>
  );
};

export default Chat;
