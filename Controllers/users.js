import { httpStatusMessages } from "../constants/httpStatusMessages.js";
import { createUser, findAllUsers, findUserByUsername, removeUserByUsername, updateUserByUsername } from "../services/users.js";
import { secretKey } from "../index.js";
import jwt from 'jsonwebtoken';

export const getAllUsers= async (req,res)=>{
    // const usersList= await sequelize.models.Users.findAll();
    const userList= await findAllUsers();
    res.json(userList);
};

export const getUserByUsername= async (req,res)=>{
    // const usersList= await sequelize.models.Users.findAll();
    const user= await findUserByUsername(req.params.username);
    res.json(user);
    // res.json({
    //     data: user,
    //     message: httpStatusMessages[res.statusCode]
    // });
};

export const postUser= async(req,res)=>{
    const {username,email,password}=req.body;
    const user = await createUser(username,email,password);
    res.json(user);
    // sequelize.models.Users.create({
    //     username,
    //     email,
    //     password
    // });
    // res.json({
    //     data:user,
    //     message: httpStatusMessages[res.statusCode]
    // });
    // const {id}=req.params;
    // const {name}=req.query;
    // const {short_name,part,full_name,partner}=req.body;
    
    // res.json({
    //     id,
    //     name,
    //     full_name,
    //     partner,
    //     short_name,
    //     part
    // });
};

export const putUserByUsername= async(req,res)=>{
    const {email,password}=req.body;
    await updateUserByUsername(req.params.username,email,password)
    const user= await findUserByUsername(req.params.username);
    res.json(user);
    // res.json({
    //     data: user,
    //     message: httpStatusMessages[res.statusCode]
    // });
};

export const deleteUserByUsername= async(req,res,next)=>{
    try{
        await removeUserByUsername(req.params.username);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
    }catch(e){
        next(e);
    }
};

export const registerUser = async (req,res)=>{
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  await createUser(username,email,password);
  res.status(201).json({ message: 'Registration successful' });

};

export const loginUser = async (req,res)=>{
    const {username, password}=req.body;
    const user=await findUserByUsername(username);
    if(!user || user.password!==password){
        return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({ userUsername: user.username }, secretKey);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
};

export const logoutUser = (req,res)=>{
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};

// export const authenticate = (req, res, next) => {
//     try {
//       if (req.session && req.session.user) {
//         return next();
//       } else {
//         return res.status(401).send('Not authenticated');
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       return res.status(500).send('Internal server error');
//     }
//   };

export const authUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    // You can use the decoded information to fetch user data from a database
    res.status(200).json({ message: 'Authenticated', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};