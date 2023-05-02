import { ObjectValidator } from "../utils/object-validator";
import { ICreateUserDTO, IUpdateUserDTO } from "../models/dtos/userDTO";
import { IUser } from "../models/types/user/iuser";

export class UserMapper {

    static toCreationalDTO(requestBody: any): ICreateUserDTO {
        return {
            email: requestBody.email,
            password: requestBody.password,
            first_name: requestBody.first_name,
            last_name: requestBody.last_name,
            rol: requestBody.rol
        }
    };

    static toUpdaterDTO(requestBody: any): IUpdateUserDTO {
        return ObjectValidator.filterUnusedKeys(requestBody);
    };

    static toReponseArray(usersFromDB: IUser[]) {
        return usersFromDB.map(({ email, first_name, last_name, rol }) => ({ email, first_name, last_name, rol }));
    };

    static toResponseObject(userFromDB: IUser) {
        return {
            email: userFromDB.email,
            first_name: userFromDB.first_name,
            last_name: userFromDB.last_name,
            rol: userFromDB.rol
        }
    }

};
