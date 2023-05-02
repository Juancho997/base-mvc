import { Router } from "express";

import { UserRepository } from "../services/user.service";
import { UserController } from "../controllers/user.ctrl";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);
const userRouter = Router();

userRouter.get('/', userController.getAll.bind(userController));
userRouter.get('/:id', userController.getById.bind(userController));
userRouter.post('/', userController.create.bind(userController));
userRouter.put('/:id', userController.updateById.bind(userController));
userRouter.delete('/:id', userController.deleteById.bind(userController));

export default userRouter;
