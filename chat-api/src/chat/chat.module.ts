import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OpenApiGateway } from 'src/openApi/openApi.gateway';

@Module({
  imports: [OpenApiGateway],
  providers: [ChatGateway],
})
export class ChatModule {}
