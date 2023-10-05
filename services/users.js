import Users from "../models/users.js"

export const createUser= async(username,email,password)=>{
    await Users.create({
        username,
        email,
        password
    });
};

export const findAllUsers= async()=>{
    return await Users.findAll()
};

export const findUserByUsername= async(username)=>{
    return await Users.findOne({
        where:{username}
    });
};

export const updateUserByUsername = async(username,email)=>{
    return await Users.update(
        {
            email,
            password
        },
        {
            where:{username}
        }
    );
};

export const removeUserByUsername = async (username)=>{
    await Users.destroy({
        where:{username}
    });
};