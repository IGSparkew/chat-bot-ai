import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { OpenApiGateway } from 'src/openApi/openApi.gateway';
import { OpenApiModule } from 'src/openApi/openApi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OpenApiModule, ConfigModule],
  providers: [ChatGateway],
})
export class ChatModule {}
