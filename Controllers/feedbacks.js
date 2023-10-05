import { findAllFeedbacks, findFeedbacksById, removeFeedbacksById, updateFeedbacksById } from "../services/feedbacks.js";
import { findUserByUsername } from "../services/users.js";

export const getAllFeedbacks = async()=>{
    const feedbackList = await findAllFeedbacks();
    res.json({
        data:feedbackList,
        message: httpStatusMessages[res.statusCode]
    });
};

export const getFeedbacksById= async(req,res)=>{
    const feedbacks= await findFeedbacksById(req.params.id);
    const users = await findUserByUsername(feedbacks.dataValues.UserUsername);
    if(!feedbacks){
        res.status(404);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
        return;
    };
    res.json({
        data:{
            ...feedbacks.dataValues,
            users
        },
        message: httpStatusMessages[res.statusCode]
    });
};

// export const getWithUsers= async(req,res)=>{
//     const feedbacks = await findById(req.params.id);
//     const users = await getUserByUsername(feedbacks.dataValues.UserUsername);
//     res.json({
//         data:{
//             ...feedbacks.dataValues,
//             users
//         },
//         message:"data retreived successfully"
//     });
// };

export const postFeedbacks = async(req,res)=>{
    const{name,email,subject,feedback,UserUsername}=req.body;
    const feedbacks = await createFeedbacks(name,email,subject,feedback,UserUsername);
    res.json({
        data:feedbacks,
        message: httpStatusMessages[res.statusCode]
    });
};

export const putFeedbacksById = async(req,res)=>{
    const{name,email,subject,feedback}=req.body;
    await updateFeedbacksById(req.params.id,name,email,subject,feedback);
    const feedbacks = await getFeedbacksById(req.params.id)
    res.json({
        data:feedbacks,
        message: httpStatusMessages[res.statusCode]
    });
};

export const deleteFeedbacksById = async(req,res)=>{
    try{
        await removeFeedbacksById(req.params.id);
        res.json({
            message:httpStatusMessages[res.statusCode]
        });
    }catch(e){
        next(e);
    }
};