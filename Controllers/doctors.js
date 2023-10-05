import { findAllDoctors, findDoctorById, createDoctor, removeDoctorById, updateDoctorById } from "../services/doctors.js";

export const getAllDoctors= async (req,res)=>{
    const DoctorList = await findAllDoctors();
    res.json({
        data: DoctorList,
        message: httpStatusMessages[res.statusCode]
    });
};

export const getDoctorById= async (req,res)=>{
    const Doctor= await findDoctorById(req.params.id);
    res.json({
        data: Doctor,
        message: httpStatusMessages[res.statusCode]
    });
};

export const postDoctor= async(req,res)=>{
    const {name,email,jabatan,phone_number}=req.body;
    await createDoctor(name,email,jabatan,phone_number)
    // sequelize.models.Users.create({
    //     username,
    //     email,
    //     password
    // });
    res.json({
        message: httpStatusMessages[res.statusCode]
    });
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

export const putDoctorById = async(req,res)=>{
    const {name,email,jabatan,phone_number}=req.body;
    await updateDoctorById(req.params.id,name,email,jabatan,phone_number)
    const Doctor= await getDoctorById(req.params.id);
    res.json({
        data: Doctor,
        message: httpStatusMessages[res.statusCode]
    });
};

export const deleteDoctorById= async(req,res,next)=>{
    try{
        await removeDoctorById(req.params.id);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
    }catch(e){
        next(e);
    }
};