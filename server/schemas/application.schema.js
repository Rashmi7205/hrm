import mongoose, { Schema } from 'mongoose';
import { APPLICATION_STATUS } from '../constansts.js';
const ApplicantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    status: {
        type: String,
        enum: APPLICATION_STATUS,
        default: APPLICATION_STATUS.NEW,
        required: true
    },
    mob_no: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
    prev_exp: [String],
    skills: { type: [String] },
    social_links:{
        linkedin: String,
        github: String,
    },  
    education_info: [
        {
            instituteName: String,
            period: {
              from: Date,
              to: Date,
            },
            course: String,
            courseType: String,
            universityName: String,
          }
    ],
}, { timestamps: true});

export default mongoose.model('Applicant', ApplicantsSchema);
