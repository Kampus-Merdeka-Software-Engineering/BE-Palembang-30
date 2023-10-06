import Doctors from "../models/doctors.js"

export const createDoctor= async(name,email,jabatan,phone_number)=>{
    await Doctors.create({
        name,
        email,
        jabatan,
        phone_number
    });
};

export const findAllDoctors= async()=>{
    return await Doctors.findAll();
};

export const findDoctorById= async(id)=>{
    return await Doctors.findOne({
        where:{id}
    });
};

export const updateDoctorById = async(id,name,email,jabatan,phone_number)=>{
    return await Doctors.update(
        {
            name,
            email,
            jabatan,
            phone_number
        },
        {
            where:{id}
        }
    );
};

export const removeDoctorById = async (id)=>{
    await Doctors.destroy({
        where:{id}
    });
};