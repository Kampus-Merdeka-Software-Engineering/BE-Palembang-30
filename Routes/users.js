import {Router} from 'express';
import { authUser, deleteUserByUsername, getAllUsers, getUserByUsername, loginUser, logoutUser, postUser, putUserByUsername, registerUser } from '../Controllers/users.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);
userRouter.get('/logout',logoutUser);
userRouter.get('/check-auth',authUser);

userRouter.post("/",postUser);
userRouter.post('/register/:username',registerUser);
userRouter.post('/login/:username',loginUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",deleteUserByUsername);

export default userRouter;