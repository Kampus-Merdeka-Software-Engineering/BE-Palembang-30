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
  try{
    const {username, password}=req.body;
    const user=await findUserByUsername(username);
    if(!user || user.password!==password){
        return res.status(401).json({message: 'Invalid username or password'});
    }
    // const token = jwt.sign({ username: user.username }, secretKey, {expiresIn: 86400,});
    // req.session.token=token;
    res.status(200).json({ 
      username: user.username,
      email: user.email,
      message: 'Login successful' 
    });
  } catch(error){
    return res.status(500).json({ message: error.message });
  }

};

// export const logoutUser = (req,res)=>{
//   try{
//     req.session = null;
//     return res.status(200).json({
//       message: "You've been signed out!"
//     });
//   }catch (err){
//     this.next(err)
//   }
// };

// export const authenticate = (req, res, next) => {
//   let token = req.session.token;
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided!' });
//   }
//   jwt.verify(token,secretKey,(err,decoded) =>{
//     if(err){
//       return res.status(401).json({
//         message: "Unauthorized!",
//       });
//     }
//     var usern=decoded.username
//     next()
//   })
// };

// export const authUser = (req, res, next) => {
//   try {
//     // Retrieve the JWT token from the cookies
//     const token = req.session.token;

//     // Check if the token is missing
//     if (!token) {
//       return res.status(403).json({ message: 'No token provided!' });
//     }
//     res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501'); // Specify the frontend origin
//     res.header('Access-Control-Allow-Credentials', true); // Allow credentials
//     // Verify the JWT token
//     jwt.verify(token, secretKey, (err, decoded) => {
//       if (err) {
//         console.error('JWT verification error:', err);
//         return res.status(401).json({
//           message: 'Unauthorized!',
//         });
//       }

//       // JWT token is valid; you can access the decoded data
//       res.status(200).json({ message: 'Authenticated', user: decoded });
//       next();
//     });
//   } catch (error) {
//     console.error('Authentication error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
