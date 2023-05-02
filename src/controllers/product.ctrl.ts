import { Request, Response } from "express";

import { ObjectValidator } from "../utils/object-validator";

import { ProductRepository } from "../services/product.service";
import { ProductMapper } from "../mappers/product-mapper";

import { ResponseCreator } from "../utils/response-creator";
import { ErrorResponseCreator } from "../utils/error-response-creator";

export class ProductController {

    constructor(private readonly productRepository: ProductRepository) { }

    async getAll(req: Request, res: Response): Promise<Response> {
        const response: ResponseCreator | ErrorResponseCreator = await this.productRepository.getAll();
        return res.status(response.statusCode).send(response.response)
    };

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.productRepository.getById(id);
        return res.status(response.statusCode).send(response.response);
    };

    async create(req: Request, res: Response) {
        let response: ResponseCreator | ErrorResponseCreator;
        const creationalDTO = ProductMapper.toCreationalDTO(req.body);
        const validation = ObjectValidator.hasUndefinedValues(creationalDTO)

        if (!validation?.valid) {
            response = new ErrorResponseCreator(`Bad Request: ${validation?.cause}`, 400)
        } else {
            response = await this.productRepository.create(creationalDTO);
        }
        
        return res.status(response.statusCode).send(response.response);
    };

    async updateById(req: Request, res: Response) {
        const { id } = req.params;
        const mappedProductUserDTO = ProductMapper.toUpdaterDTO(req.body);
        const response: ResponseCreator | ErrorResponseCreator = await this.productRepository.updateById(id, mappedProductUserDTO);
        return res.status(response.statusCode).send(response.response);
    };

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        const response: ResponseCreator | ErrorResponseCreator = await this.productRepository.deleteById(id);
        return res.status(response.statusCode).send(response.response);
    };

}


