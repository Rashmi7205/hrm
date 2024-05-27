import mongoose from 'mongoose';
import { APPLICATION_STATUS } from '../constansts.js';
const ApplicantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    job_id: { type: String, ref: 'Job', required: true },
    status: {
        type: String,
        enum: APPLICATION_STATUS,
        default: APPLICATION_STATUS.NEW,
        required: true
    },
    mob_no: { type: String, required: true },
    email: { type: String, required: true },
    resume: { type: String, required: true },
    prev_exp: [Object],
    skills: { type: [String] },
    education_info: [
        {
            institute_name: { type: String},
            course: { type: String,},
            startedAt: { type: Date,},
            endedAt: { type: Date,},
        }
    ],
}, { timestamps: true});

export default mongoose.model('Applicant', ApplicantsSchema);
