import { IMessage } from "src/chat/chat.gateway";
import OpenAI from 'openai';


export class OpenApiGateway {
    openai: OpenAI;


    async handleCallApi(language: string, message: IMessage) {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello!' }],
          });
      
    }
}