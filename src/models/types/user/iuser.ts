import { Document } from 'mongoose';
import { Roles } from '../../enums/roles';

export interface IUser extends Document {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    rol: Roles
};