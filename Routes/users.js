import {Router} from 'express';
import { getAllUsers, getUserByUsername, postUser, putUserByUsername } from '../Controllers/users.js';
import { removeUserByUsername } from '../services/users.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);

userRouter.post("/",postUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",removeUserByUsername);

export default userRouter;