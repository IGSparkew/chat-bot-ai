import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { IMessage } from "src/chat/chat.gateway";

@Injectable()
export class OpenApiGateway { 
    constructor(private readonly httpService:HttpService) {}

    async handleCallApi(language: string, message: IMessage) {

       return await this.callApi(`translate the following text into ${language} : ${message.content}`);        
    }

    async handleCheckTraduction(original: string, traduction: string, language: string): Promise<boolean> {
        const response = await this.callApi(`say yes or no if ${traduction} is the translated word of ${origin} in ${language}`) as string;
        if (response) {
            return response.toLocaleLowerCase().includes("yes");
        }
    
    }

    private async callApi(prompt: string) {
        const response = await this.httpService.axiosRef.post('https://booty-somewhat-tooth-rr.trycloudflare.com/api/v1/generate', {
            max_context_length: 1600,
            max_length: 120,
            prompt: `### Instruction: ${prompt} ### Response:`,
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

        if (response.data && response.data.results) {
            if (response.data.results[0].text) {
                return response.data.results[0].text;
            }
        }

        return response;
    }
    
    


    // Say yes or no if 'trad' is the translate of  
}