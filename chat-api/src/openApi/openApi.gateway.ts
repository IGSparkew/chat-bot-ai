import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IMessage } from "src/chat/chat.gateway";

@Injectable()
export class OpenApiGateway { 
    constructor(private readonly httpService:HttpService, private readonly configService:ConfigService) {}

    async handleTraduction(language: string, message: IMessage) {
       return await this.callApi(`translate the following text into ${language} : ${message.content}`);        
    }

    async handleCheckData(content: string): Promise<string> {
        return await this.callApi(`is the phrase '${content}' correct and not misleading? `) as string;
    }

    async handleSuggest(messages: IMessage[]) {
        return await this.callApi(`suggest a sententce for a chat`, messages);
    }

    private async callApi(prompt: string, context: IMessage[] = []) {
        let before = ""
        if (context) {
            context.forEach((c) => {
                before += c.username + ": " + c.content + " "
            })
        }
        
        const response = await this.httpService.axiosRef.post(this.configService.get("API_URL"), {
            max_context_length: 1600,
            max_length: 120,
            prompt: `${before} ### Instruction: ${prompt} ### Response:`,
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


        if (response.data && response.data.results) {
            if (response.data.results[0].text) {
                return response.data.results[0].text;
            }
        }

        return response;
    }
    
}