import { Schema,model } from "mongoose";
import { LEAVE_TYPE_ENUM, LEAVR_STATUS_ENUM } from "../constansts.js";

const leaveSchema = new Schema({
    emp_id:{type:Schema.Types.ObjectId,ref:'employee',required:true},
    leave_type:{
        type:String,
        enum:LEAVE_TYPE_ENUM,
    },
    from_date:{
        type:Date,
    },
    to_date:{
        type:Date,
    },
    reason:{type:String},
    status:{type:String,enum:LEAVR_STATUS_ENUM},
},{timestamps:true});
export default model('Leave',leaveSchema);