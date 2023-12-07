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
  language: string;
  timeSent: string;
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
      
      if (c.language) {
      let response = await this.chatBot.handleCallApi(c.language, payload);
        
        let chatPayload = {...payload};
        chatPayload.content = response;
        
        this.server.emit('chat-message', {
          ...chatPayload,
          username: c.username
        });
      }

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
  handleLanguageSet(client: any, payload: any): void {
    const c = this.clients.find((c) => c.client.id === client.id);
    if (c) {
      c.language = payload.language;
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
