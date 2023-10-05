import {Router} from 'express';
import { deleteUserByUsername, getAllUsers, getUserByUsername, postUser, putUserByUsername } from '../Controllers/users.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);

userRouter.post("/",postUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",deleteUserByUsername);

export default userRouter;