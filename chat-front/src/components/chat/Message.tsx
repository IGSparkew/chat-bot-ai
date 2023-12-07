import { Socket } from "socket.io-client";
import Traduction from "./Traduction";

export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
  id:number;
}

interface Props {
  message: IMessage;
  isMe: boolean;
  socket: Socket;
}

const Message = ({ message, isMe, socket }: Props) => {
  return (
    <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {message.username}
        <time className="text-xs opacity-50">{message.timeSent}</time>
      </div>
      <div
        className={`chat-bubble ${
          isMe ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message.content}
      <div>
        <Traduction socket={socket} messageId={message.id} />
      </div>
      </div>
    </div>
  );
};

export default Message;
