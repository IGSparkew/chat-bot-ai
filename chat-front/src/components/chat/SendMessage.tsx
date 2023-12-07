"use client";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  username: string;
}

const SendMessage = ({ socket, username }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat-message", {
      username,
      content: text,
      timeSent: new Date().toISOString(),
      id:Math.random(),
    });

    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SendMessage;
