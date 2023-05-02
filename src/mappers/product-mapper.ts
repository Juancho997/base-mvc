import { ObjectValidator } from "../utils/object-validator";
import { ICreateProductDTO, IUpdateProductDTO } from "../models/dtos/productDTO";
import { IProduct } from "../models/types/product/iproduct";

export class ProductMapper {

    static toCreationalDTO(requestBody: any): ICreateProductDTO {
        return {
            name: requestBody.name,
            description: requestBody.description
        }
    };

    static toUpdaterDTO(requestBody: any): IUpdateProductDTO {
        return ObjectValidator.filterUnusedKeys(requestBody);
    };

    static toReponseArray(productsFromDB: IProduct[]) {
        return productsFromDB.map(({ name, description }) => ({ name, description }));
    };

    static toResponseObject(productFromDB: IProduct) {
        return {
            name: productFromDB.name,
            description: productFromDB.description
        }
    }

};
