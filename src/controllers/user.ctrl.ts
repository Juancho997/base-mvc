import { Request, Response } from "express";

import { ObjectValidator } from "../utils/object-validator";

import { UserRepository } from "../services/user.service";
import { UserMapper } from "../mappers/user-mapper";

import { ResponseCreator } from "../utils/response-creator";
import { ErrorResponseCreator } from "../utils/error-response-creator";

export class UserController {

    constructor(private readonly userRepository: UserRepository) { }

    async getAll(req: Request, res: Response): Promise<Response> {
        const response: ResponseCreator | ErrorResponseCreator = await this.userRepository.getAll();
        return res.status(response.statusCode).send(response.response)
    };

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.userRepository.getById(id);
        return res.status(response.statusCode).send(response.response);
    };

    async create(req: Request, res: Response) {

    let response: ResponseCreator | ErrorResponseCreator;

    const creationalDTO = UserMapper.toCreationalDTO(req.body);
    const validation = ObjectValidator.hasUndefinedValues(creationalDTO)

    if (!validation?.valid) {
      response = new ErrorResponseCreator(`Bad Request: ${validation?.cause}`, 400)
    } else {
      response = await this.userRepository.create(creationalDTO);
    }
    
        return res.status(response.statusCode).send(response.response);
    };

    async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const mappedUserDTO = UserMapper.toUpdaterDTO(req.body);
        const response: ResponseCreator | ErrorResponseCreator = await this.userRepository.updateById(id, mappedUserDTO);
        return res.status(response.statusCode).send(response.response);
    };

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.userRepository.deleteById(id);
        return res.status(response.statusCode).send(response.response);
    };

}


