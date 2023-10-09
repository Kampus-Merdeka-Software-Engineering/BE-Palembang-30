import {Router} from 'express';
import { deleteUserByUsername, getAllUsers, getUserByUsername, loginUser, postUser, putUserByUsername, registerUser } from '../Controllers/users.js';

const userRouter = Router();

userRouter.get("/:username",getUserByUsername);
userRouter.get("/",getAllUsers);
// userRouter.get('/profile', authUser);

userRouter.post("/",postUser);
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
// userRouter.post('/logout',logoutUser);

userRouter.put("/:username",putUserByUsername);

userRouter.delete("/:username",deleteUserByUsername);

export default userRouter;