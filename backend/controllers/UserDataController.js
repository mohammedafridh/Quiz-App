import UserDataModel from "../models/UserDataModel.js";
import validator from "validator";

//save assessment details
export const saveAssessmentDetails = async(req,res)=>{
    const{fullName,emailAddress,contactNumber,currentWorkplace,jobRole,result} = req.body

    try{
        if(!fullName|| !emailAddress|| !contactNumber|| !currentWorkplace|| !jobRole){
            throw Error('*All fields must be filled!')
        }if(!validator.isEmail(emailAddress)){
            throw Error('*Enter a valid email address')
        }if(contactNumber.length!==10){
            throw Error('Contact Number must be 10 digits')
        }
        else{
            const data = await UserDataModel.create(req.body)
            res.status(200).json(data)
        }
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

export const viewAllAssessmentDetails = async(req,res)=>{

    try{
        const result = await UserDataModel.find()
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}