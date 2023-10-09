import { httpStatusMessages } from "../constants/httpStatusMessages.js";
import { createDiabetesChecks, findAllDiabetesChecks, findDiabetesChecksById, removeDiabetesChecksById, updateDiabetesChecksById } from "../services/diabetes_checks.js";
import { findUserByUsername } from "../services/users.js";

export const getAllDiabetesChecks= async (req,res)=>{
    const diabetesCheckList = await findAllDiabetesChecks();
    res.json(diabetesCheckList);
    // res.json({
    //     data: diabetesCheckList,
    //     message: httpStatusMessages[res.statusCode]
    // });
};

export const getDiabetesChecksById= async(req,res)=>{
    const diabetesChecks= await findDiabetesChecksById(req.params.id);
    const users = await findUserByUsername(diabetesChecks.dataValues.UserUsername);
    if(!diabetesChecks){
        res.status(404);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
        return;
    };
    res.json(...diabetesChecks.dataValues,users);
    // res.json({
    //     data:{
    //         ...diabetesChecks.dataValues,
    //         users
    //     },
    //     message:httpStatusMessages[res.statusCode]
    // });
};

export const postDiabetesChecks= async(req,res)=>{
    const {name,email,age,gender,result,UserUsername}=req.body;
    const diabetesChecks = await createDiabetesChecks(name,email,age,gender,result,UserUsername)
    res.json(diabetesChecks);
    // res.json({
    //     data: diabetesChecks,
    //     message: httpStatusMessages[res.statusCode]
    // });
};

export const putDiabetesChecksById = async(req,res)=>{
    const {name,email,age,gender,result}=req.body;
    await updateDiabetesChecksById(req.params.id,name,email,age,gender,result)
    const diabetesChecks= await findDiabetesChecksById(req.params.id);
    res.json(diabetesChecks);
    // res.json({
    //     data: DiabetesCheck,
    //     message: httpStatusMessages[res.statusCode]
    // });
};

export const deleteDiabetesChecksById= async(req,res,next)=>{
    try{
        await removeDiabetesChecksById(req.params.id);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
    }catch(e){
        next(e);
    }
};