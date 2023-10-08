import { httpStatusMessages } from "../constants/httpStatusMessages.js";
import { createUser, findAllUsers, findUserByUsername, removeUserByUsername, updateUserByUsername } from "../services/users.js";

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
  const { username, email,password } = req.body;
  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  await createUser(username,email,password)
  res.send('Registration successful');
};

export const loginUser = async (req,res)=>{
    const {username,password}=req.body;
    const user=await findUserByUsername(username);
    if(!user || user.password!=password){
        return res.status(401).send('Invalid username or password');
    }
    req.session.user=user;
    res.send('Login successful')
};

export const logoutUser = async (req,res)=>{
    req.session.destroy();
    res.send('Logged out')
};

export const authUser = async (req,res)=>{
    if (req.session.user) {
        res.send(`Authenticated as ${req.session.user.username}`);
    } else {
        res.status(401).send('Not authenticated');
    }
};