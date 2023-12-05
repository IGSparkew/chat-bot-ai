import { useState } from "react";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  setLanguage: (language: string) => void;
}

const Language = ({ socket, setLanguage }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLanguage(text);
    socket.emit("language-set", {
      language: text,
    });
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

export default Language;