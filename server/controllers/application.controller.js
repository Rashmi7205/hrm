import ServerError from '../utils/server.error.js';
import Applicant from '../schemas/application.schema.js';
import Job from '../schemas/jobs.schema.js';

const getAllApplicant = async (req, res, next) => {
    try {
        let {limit,offset} = req.params;
        if(!limit){
            limit = 10;
            offset = 0;
        }
        const applications = await Applicant.find().limit(limit).skip(offset);
    
        if(!applications.length){
            next(new ServerError("Cannot find applicantions"));
        }
        res.status(200).json({
            applications
        });
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const getApplicantById =async(req, res, next) => {
    try {
        const {id} =req.params;
        if(!id){
            next(new ServerError("Please provide applicant id", 400));
        }
        const application = await Applicant.findById(id);
        if(!application){
            next(new ServerError("Cannot find applicantions",400));
        }
        res.status(200).json({
            application
        });
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const createApplicant = async(req, res, next) => {
    try {
        const {
            name,
            job_id,
            mob_no,
            email,
            prev_exp,
            skills,
            education_info
        } = req.body;
        const resume = req.file.path;
        //Basic validation
        if (!name || !job_id  || !mob_no || !email || !resume) {
           return next(new ServerError("Missing Required fields",404));
        }
       

        // Check if the job_id exists
        const jobExists = await Job.findById(job_id);
        if (!jobExists) {
            return next(new ServerError("Job does not exist",404));
        }

        // Create a new applicant
        const newApplicant = await Applicant.create({
            name,
            job_id,
            status:"new",
            mob_no,
            email,
            resume,
            prev_exp,
            skills,
            education_info
        });
        // Save the applicant to the database
        const savedApplicant = await newApplicant.save();

        if(!savedApplicant){
            return next(new ServerError("Cannot create application",400));
        }
        res.status(200).json({
            success:true,
            message:"Application saved",
            savedApplicant
        });

    } catch (error) {
        next(new ServerError("Internal Server Error" + error.message, 501));
    }
}
const updateApplicant = async(req, res, next) => {
    try {
        const {
            name,
            job_id,
            mob_no,
            email,
            resume,
            prev_exp,
            skills,
            education_info
        } = req.body;

        const {id} = req.params;
        if(!id) {
            next(new ServerError("Missing application id",400));
        }
        // Basic validation
        if (!name || !job_id  || !mob_no || !email || !resume) {
            next(new ServerError("All Fields are mandatory",404));
        }

        // Check if the job_id exists
        const jobExists = await Job.findById(job_id);
        if (!jobExists) {
           next(new ServerError("Job does not exist",404));
        }
        const updatedApplication = await Applicant.findByIdAndUpdate(id,{
            name,
            job_id,
            mob_no,
            email,
            resume,
            prev_exp,
            skills,
            education_info
        }); 
        
        if(!updateApplicant){
            next(new ServerError("Cannot update application",404));
        }
        res.status(200).json(
            updatedApplication
        );

    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const deleteApplicant =  async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) {
            next(new ServerError("Id is missing ",400));
        }
        const deleteApplication = await Applicant.findByIdAndDelete(id);
        if(!deleteApplication){
            next(new ServerError("Cannot delete application",400));
        } 
        res.status(200).json(
          {  success:true,
            message:"Application deleted successfully"
        }
        );
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}

export {
    getAllApplicant,
    createApplicant,
    getApplicantById,
    updateApplicant,
    deleteApplicant
}