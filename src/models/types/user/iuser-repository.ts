import { ResponseCreator } from "../../../utils/response-creator";
import { ErrorResponseCreator } from "../../../utils/error-response-creator";
import { ICreateUserDTO, IUpdateUserDTO } from "../../dtos/userDTO";

export interface IUserRepository {
    getAll(): Promise<ResponseCreator | ErrorResponseCreator>;
    getById(id: string): Promise<ResponseCreator | ErrorResponseCreator>;
    create(creationalDTO: ICreateUserDTO): Promise<ResponseCreator | ErrorResponseCreator>;
    updateById(id: string, updaterDTO: IUpdateUserDTO): Promise<ResponseCreator | ErrorResponseCreator>;
    deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator>;
};
