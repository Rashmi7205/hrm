import mongoose, { Schema } from "mongoose";
import { APPLICATION_STATUS } from "../constansts.js";

const payrollSchema = new mongoose.Schema({
    emp_id:{type:Schema.Types.ObjectId,ref:'Employee',required:true},
    pay_period:{type:String},
    pay_rate:{type:String},
    status:{type:String,enum:APPLICATION_STATUS}
},{timestamps:true});
export default model('Payroll',payrollSchema);