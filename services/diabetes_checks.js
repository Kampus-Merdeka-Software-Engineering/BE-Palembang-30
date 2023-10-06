import DiabetesChecks from "../models/diabetes_checks.js"

export const createDiabetesChecks= async(name,email,age,gender,result,UserUsername)=>{
    await DiabetesChecks.create({
        name,
        email,
        age,
        gender,
        result,
        UserUsername
    });
};

export const findAllDiabetesChecks= async()=>{
    return await DiabetesChecks.findAll();
};

export const findDiabetesChecksById= async(id)=>{
    return await DiabetesChecks.findOne({
        where:{id}
    });
};

export const updateDiabetesChecksById = async(id,name,email,age,gender,result)=>{
    return await DiabetesChecks.update(
        {
            name,
            email,
            age,
            gender,
            result
        },
        {
            where:{id}
        }
    );
};

export const removeDiabetesChecksById = async (id)=>{
    await DiabetesChecks.destroy({
        where:{id}
    });
};