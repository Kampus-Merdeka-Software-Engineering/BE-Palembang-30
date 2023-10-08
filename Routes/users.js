import {Router} from 'express';
import { authUser, deleteUserByUsername, getAllUsers, getUserByUsername, loginUser, logoutUser, postUser, putUserByUsername, registerUser } from '../Controllers/users.js';
import sessionMiddleware from '../config/session.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);
userRouter.get('/logout',sessionMiddleware,logoutUser);
userRouter.get('/check-auth',sessionMiddleware,authUser);

userRouter.post("/",postUser);
userRouter.post('/register',registerUser);
userRouter.post('/login',sessionMiddleware,loginUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",deleteUserByUsername);

export default userRouter;