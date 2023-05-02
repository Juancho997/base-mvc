import logger from "../utils/logger";

import User from "../db/models/User";
import { IUser } from "../models/types/user/iuser";
import { IUserRepository } from "../models/types/user/iuser-repository";

import { ICreateUserDTO, IUpdateUserDTO } from "../models/dtos/userDTO";
import { ResponseCreator } from "../utils/response-creator";
import { ErrorResponseCreator } from "../utils/error-response-creator";
import { Status } from "../models/enums/status";
import { UserMapper } from "../mappers/user-mapper";

export class UserRepository implements IUserRepository {

    async getAll(): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const allUsers: IUser[] | [] = await User.find();

            if (allUsers.length === 0) {
                logger.warn('No Users in DB');
                return new ResponseCreator('No Users in DB', Status.NOT_FOUND)
            }

            logger.info('All Users sent to client');
            return new ResponseCreator(UserMapper.toReponseArray(allUsers), Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        };
    };

    async getById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundUser: IUser | null = await User.findById(id);

            if (!foundUser) {
                logger.warn('User not found');
                return new ResponseCreator('User not found', Status.NOT_FOUND)
            }

            logger.info(`User with ID : ${id} sent to client`);
            return new ResponseCreator(UserMapper.toResponseObject(foundUser), Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }
    }

    async create(creationalDTO: ICreateUserDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundUser = await User.findOne({ name: creationalDTO.email });

            if (foundUser) {
                return new ResponseCreator('User with that email already exists', Status.NOT_MODIFIED)
            }

            const newUser = new User(creationalDTO);
            await newUser.save();

            logger.info('New User created');

            return new ResponseCreator('New User created', Status.CREATED)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        };
    };

    async updateById(id: string, updaterDTO: IUpdateUserDTO): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundUser: IUser | null = await User.findById(id);

            if (!foundUser) {
                logger.warn('User not found');
                return new ResponseCreator('User not found', Status.NOT_FOUND)
            }


            await User.findByIdAndUpdate(id, updaterDTO);
            logger.info(`User with id ${id} updated`);
            return new ResponseCreator('User updated', Status.OK)

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }

    }

    async deleteById(id: string): Promise<ResponseCreator | ErrorResponseCreator> {

        try {

            const foundUser: IUser | null = await User.findById(id);

            if (!foundUser) {
                logger.warn('User not found');
                return new ResponseCreator('User not found', Status.NOT_FOUND)
            }


            await User.findByIdAndDelete(id);

            logger.info(`User with ID : ${id} deleted`);
            return new ResponseCreator('User deleted', Status.OK);

        } catch (err) {
            logger.error(err);
            return new ErrorResponseCreator('Something went wrong', Status.INTERNAL_SERVER_ERROR);
        }


    }
}; 
