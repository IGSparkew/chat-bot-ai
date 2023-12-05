import { Module } from '@nestjs/common';
import { OpenApiGateway } from './openApi.gateway';

@Module({
  providers: [OpenApiGateway],
})
export class OpenApiModule {}