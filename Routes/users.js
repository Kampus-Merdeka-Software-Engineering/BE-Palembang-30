import {Router} from 'express';
import { authUser, authenticate, deleteUserByUsername, getAllUsers, getUserByUsername, loginUser, logoutUser, postUser, putUserByUsername, registerUser } from '../Controllers/users.js';
import sessionMiddleware from '../config/session.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);
userRouter.get('/logout',logoutUser);
userRouter.get('/profile',authUser);

userRouter.post("/",postUser);
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",deleteUserByUsername);

export default userRouter;