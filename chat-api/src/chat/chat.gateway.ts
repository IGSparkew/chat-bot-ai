import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OpenApiGateway } from 'src/openApi/openApi.gateway';

export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
  id:number;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  clients: { client: Socket; username?: string; language?: string}[] = [];
  chatMessages: IMessage[] = [];

  constructor(private readonly chatBot:OpenApiGateway) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    this.server.emit('message', payload);
    console.log({ payload });
    return 'Hello world!';
  }

  @SubscribeMessage('chat-message')
  async handleChatMessage(client: any, payload: IMessage): Promise<void> {
    const c = this.clients.find((c) => c.client.id === client.id);
    if (c.username) {

      this.server.emit('chat-message', {
        ...payload,
        username: c.username,
      });
   
      this.chatMessages.push({
        ...payload,
        username: c.username,
      });
    }
  }

  @SubscribeMessage('username-set')
  handleUsernameSet(client: any, payload: any): void {
    const c = this.clients.find((c) => c.client.id === client.id);
    if (c) {
      c.username = payload.username;
    }
  }

  @SubscribeMessage('language-set')
  async handleLanguageSet(client: any, payload: any) {
    const c = this.clients.find((c) => c.client.id === client.id);
    const message = this.chatMessages.find((m) => m.id == payload.messageId)
    if (message) {
      let response = await this.chatBot.handleCallApi(payload.language, message);
      message.content = response;
      console.log(this.chatMessages);
      client.emit('message-trad', {
        id: message.id,
        content: response
      });
    }


  }

  handleConnection(client: Socket) {
    console.log('client connected ', client.id);
    this.clients.push({
      client,
    });
    client.emit('messages-old', this.chatMessages);
  }

  handleDisconnect(client: any) {
    console.log('client disconnected ', client.id);
    this.clients = this.clients.filter((c) => c.client.id !== client.id);
  }
}
