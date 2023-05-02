export class ResponseCreator {

    statusCode: number;
    response: string | any[] | {};

    constructor(response: string | any[] | {}, statusCode: number) {
        this.response = response
        this.statusCode = statusCode
    };

};
