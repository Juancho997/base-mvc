export class ErrorResponseCreator {
    
    response: string;
    statusCode: number;

    constructor(response: string, statusCode: number){
        this.response = response;
        this.statusCode = statusCode;
    }

}