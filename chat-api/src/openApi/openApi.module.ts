import { Module } from '@nestjs/common';
import { OpenApiGateway } from './openApi.gateway';
import { Axios } from 'axios';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [OpenApiGateway],
  exports: [OpenApiGateway]
})
export class OpenApiModule {}