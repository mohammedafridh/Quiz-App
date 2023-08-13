import mongoose from "mongoose";

const UserDataSchema = mongoose.Schema({
    fullName: {
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true
    },
    contactNumber: {
        type:Number,
        required:true
    },
    currentWorkplace:{
        type:String,
        required:true
    },
    jobRole: {
        type:String,
        required:true
    },
    result: Number,

},
    {timestamps:true}
)

const UserDataModel = mongoose.model('AssesmentData', UserDataSchema)
export default UserDataModel