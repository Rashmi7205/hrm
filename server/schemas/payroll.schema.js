import mongoose, { Schema,model } from "mongoose";
import {JOBSTATUS_ENUM } from "../constansts.js";

const payrollSchema = new mongoose.Schema({
    emp_id:{type:Schema.Types.ObjectId,ref:'Employee',required:true},
    pay_period:{type:String},
    pay_rate:{type:String},
    status:{type:String,enum:JOBSTATUS_ENUM ,default:JOBSTATUS_ENUM.ACTIVE},
    emp_name:{type:String},
    emp_email:{type:String},
    emp_position:{type:String}
},{timestamps:true});
export default model('Payroll',payrollSchema);