import { ResponseCreator } from "../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../utils/error-response-creator";
import { ICreateProductDTO, IUpdateProductDTO } from "../../dtos/productDTO";

export interface IProductRepository {
    getAll(): Promise<ResponseCreator | ErrorResponseCreator>;
    getById(id: string): Promise<ResponseCreator | ErrorResponseCreator>;
    create(creationalDTO: ICreateProductDTO): Promise<ResponseCreator | ErrorResponseCreator>;
    updateById(id: string, updaterDTO: IUpdateProductDTO): Promise<ResponseCreator | ErrorResponseCreator>;
    deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator>;
};
