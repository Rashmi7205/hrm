import {Schema,model} from 'mongoose';
import { EMP_TYPE_ENUM, JOB_FOR_ENUM, JOBSTATUS_ENUM } from '../constansts.js';

const JobSchema = new Schema({
    title: { type: String, required: true,maxLen:100},
    job_desc: { type: String, },
    location: { type: String, required: true },
    status: { type: String, 
        required: true ,
        enum:JOBSTATUS_ENUM,
        default: JOBSTATUS_ENUM.ACTIVE
    },
    dept_name: { type: String, required: true },
    work_exp: { type: String, required: true },
    skills_req: { type: [String], required: true },
    salary: { 
        currency:{type:String,required:true},
        amount:{ type: String, required: true},
        per_time:{type:String,required:true}
    },
    employement_type: { 
        type: String, 
        enum:EMP_TYPE_ENUM,
        default:EMP_TYPE_ENUM.FULLTIME,
        required: true 
    },
    opening_date: { type: Date, required: true ,deafult:
        Date.now()
     },
    closing_date: { type: Date },
    education: { type: String,default:"any"},
    job_suitable_for: { type: [String], 
        enum:JOB_FOR_ENUM,
        default:JOB_FOR_ENUM.ALL,
        required: true },
    responsibility: { type: String, required: true },
    contact: { 
        email: { type: String, required: true },
        phone: { type: String, required: true },
        contact_person:{type:String,required:true},
     },
},{timestamps:true});

export default model('Job', JobSchema);
