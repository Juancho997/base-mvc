import logger from "../utils/logger";

import Product from "../db/models/Product";
import { IProduct } from "../models/types/product/iproduct";
import { IProductRepository } from "../models/types/product/iproduct-repository";
import { ProductMapper } from "../mappers/product-mapper";
import { ICreateProductDTO, IUpdateProductDTO } from "../models/dtos/productDTO";

import { Status } from "../models/enums/status";
import { ResponseCreator } from "../utils/response-creator";
import { ErrorResponseCreator } from "../utils/error-response-creator";

export class ProductRepository implements IProductRepository {

    async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const allProducts: IProduct[] | [] = await Product.find();

            if (allProducts.length === 0) {
                logger.warn('No Products in DB');
                return new ResponseCreator('No Products in DB', Status.NOT_FOUND)
            }

            logger.info('All Products sent to client');
                       
            return new ResponseCreator(ProductMapper.toReponseArray(allProducts), Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        };
    };

    async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', Status.NOT_FOUND)
            }

            logger.info(`Product with ID : ${id} sent to client`);
            return new ResponseCreator(ProductMapper.toResponseObject(foundProduct), Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }
    }

    async create(creationalDTO: ICreateProductDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct = await Product.findOne({ name: creationalDTO.name });

            if (foundProduct) {
                return new ResponseCreator('Product with that name already exists', Status.NOT_MODIFIED)
            }

            const newProduct = new Product(creationalDTO);
            await newProduct.save();

            logger.info('New Product created');

            return new ResponseCreator('New Product created', Status.CREATED)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        };
    };

    async updateById(id: string, updaterDTO: IUpdateProductDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', Status.NOT_FOUND)
            }

            await Product.findByIdAndUpdate(id, updaterDTO);

            logger.info(`Product with id ${id} updated`);
            return new ResponseCreator('Product updated', Status.OK)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }

    }

    async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundProduct: IProduct | null = await Product.findById(id);

            if (!foundProduct) {
                logger.warn('Product not found');
                return new ResponseCreator('Product not found', Status.NOT_FOUND)
            }


            await Product.findByIdAndDelete(id);

            logger.info(`Product with ID : ${id} deleted`);
            return new ResponseCreator('Product deleted', Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }


    }
}; 
