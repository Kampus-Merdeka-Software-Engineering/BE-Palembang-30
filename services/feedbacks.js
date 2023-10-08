import Feedbacks from "../models/feedbacks.js"

export const findFeedbacksById= async(id)=>{
    return await Feedbacks.findOne({
        where:{id}
    });
};

export const createFeedbacks=async(name,email,subject,feedback)=>{
    await Feedbacks.create({
        name,
        email,
        subject,
        feedback,
        // UserUsername
    });
};

export const findAllFeedbacks= async()=>{
    return await Feedbacks.findAll();
};

export const updateFeedbacksById = async(id,name,email,subject,feedback)=>{
    return await Feedbacks.update(
        {
            name,
            email,
            subject,
            feedback
        },
        {
            where:{id}
        }
    );
};

export const removeFeedbacksById = async (id)=>{
    await Feedbacks.destroy({
        where:{id}
    });
};