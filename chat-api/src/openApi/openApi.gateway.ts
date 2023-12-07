import { HttpModule, HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Axios } from "axios";
import { resolve } from "path";
import { map, tap } from "rxjs";
import { IMessage } from "src/chat/chat.gateway";

@Injectable()
export class OpenApiGateway { 
    constructor(private readonly httpService:HttpService) {}

    async handleCallApi(language: string, message: IMessage) {
       const response = await this.httpService.axiosRef.post('https://packard-performs-parks-gt.trycloudflare.com/api/v1/generate', {
            max_context_length: 1600,
            max_length: 120,
            prompt: `### Instruction: ${message.content} ### Response: `,
            quiet: false,
            rep_pen: 1.1,
            rep_pen_range: 256,
            rep_pen_slope: 1,
            temperature: 0.7,
            tfs: 1,
            top_a: 0,
            top_k: 100,
            top_p: 0.92,
            typical: 1
        });

        
        console.log(response.data);

        if (response.data && response.data.results.lenght > 0 ) {
            if (response.data.results[0].text) {
                return response.data.results[0].text;
            }
        }
        
    }
}