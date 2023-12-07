import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  messageId: number;
}

const Traduction = ({ socket, messageId }: Props) => {
  const [text, setText] = useState("french");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("language-set", {
      language: text,
      messageId: messageId
    });
  };

  return (
    <form onSubmit={handleSubmit}>
     <select onChange={(e) => setText(e.target.value)} defaultValue={"french"}>
     <option value={"english"}>english</option>
      <option value={"french"}>french</option>
      <option value={"spanish"}>spain</option>
    </select>
    <button type="submit">traduction</button>
    </form>
  );
};

export default Traduction;