import { Schema, model } from 'mongoose';
import { IUser } from '../../models/types/user/iuser';
import { Roles } from '../../models/enums/roles';

const User_Schema = new Schema<IUser>({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    rol: {
        type: String,
        default: Roles.USER
    }
});

const User = model('User', User_Schema);

export default User;

