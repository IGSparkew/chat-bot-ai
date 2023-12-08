"use client";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import {v4 as uuidv4} from 'uuid';

interface Props {
  socket: Socket;
  username: string;
}

const SendMessage = ({ socket, username }: Props) => {
  const [text, setText] = useState("");
  const [isSuggestion, setSuggestion] = useState(false);

  useEffect(() => {
    socket.on("chat-suggest", (response) => {
      setText(response.data);
    })
  },[]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat-message", {
      username,
      content: text,
      timeSent: new Date().toISOString(),
      info: "",
      id:uuidv4(),
    });

    setText("");
  };

  const handleSuggest = () => {
    setSuggestion(true);
    socket.emit("user-suggest");
  }

  const handleRemoveSuggest = () => {
    setSuggestion(false);
    setText("");
  }

  return (
    <footer className="sticky bottom-0">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1">Submit</button>
      {
        !isSuggestion && <button type="button" onClick={handleSuggest} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1">suggest-me</button>
      }

      {
        isSuggestion && <button type="button" onClick={handleRemoveSuggest} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1">remove-suggestion</button>
      }
    </form>
    </footer>
  );
};

export default SendMessage;
