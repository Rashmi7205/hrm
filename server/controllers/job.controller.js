import Job from '../schemas/jobs.schema.js';
import ServerError from '../utils/server.error.js';


const getAllJobs = async (req, res, next) => {
    try {
        let { limit, offset } = req.params;
        if (!limit) {
            limit = 50;
            offset = 0;
        }
        const { search } = req.body;
        if (search) {
            // const jobs = await Job.find({
            //     $or: [
            //         { dept_name: { $in: search } },
            //         { work_exp: { $in: search } },
            //         { location: { $in: search } },
            //         { title: { $in: search } }
            //     ]
            // }).limit(limit).skip(offset);
            const jobs = await Job.aggregate([
                {
                    $match: {
                        $or: [
                            { title: { $in: search } },
                            { dept_name: { $in: search } },
                            { location: { $in: search } },
                            { work_exp: { $in: search } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "applicants",
                        localField: "_id",
                        foreignField: "job_id",
                        as: "applicants"
                    },
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $limit: limit
                },
                {
                    $skip: skip
                }
            ]);
            if (!jobs) {
                return next(new ServerError('No jobs found', 404));
            }
            return res.status(200).json({
                count: jobs.length,
                jobs
            });
        }
        //const jobs = await Job.find({}).limit(limit).skip(offset);
        const jobs = await Job.aggregate([
            {
                $lookup: {
                    from: "applicants",
                    localField: "_id",
                    foreignField: "job_id",
                    as: "applicants"
                },
            },
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $limit: limit
            },
            {
                $skip: skip
            }
        ]);
        if (!jobs) {
            return next(new ServerError('No jobs found', 404));
        }
        return res.status(200).json({
            count: jobs.length,
            jobs
        });
    } catch (error) {
        next(new ServerError("Internal Server Error" + error.message, 501));
    }
}
const getJobById = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        if (!jobId) {
            return next(new ServerError("Job Id is required", 400));
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return next(new ServerError("Job not found", 404));
        }
        res.status(200).json({
            status: true,
            message: "Job fetched successfully",
            job
        });
    } catch (error) {
        next(new ServerError("Internal Server Error" + error.message, 501));
    }
}
const createJob = async (req, res, next) => {
    try {
        const {
            title, job_desc, location, status, dept_name, work_exp, skills_req, salary,
            employement_type, opening_date, closing_date, education, job_suitable_for,
            responsibility, contact
        } = req.body;
        // Basic validation
        if (!title || !location || !status || !dept_name || !work_exp || !skills_req || !salary || !employement_type || !opening_date || !job_suitable_for || !responsibility || !contact) {
            console.log(title, job_desc, location, status, dept_name, work_exp, skills_req, salary,
                employement_type, opening_date, closing_date, education, job_suitable_for,
                responsibility, contact);
            return res.status(400).json({ success: false, message: 'All required fields must be provided' });
        }
        if (!Array.isArray(skills_req) || skills_req.length === 0) {
            return res.status(400).json({ success: false, message: 'Skills required must be a non-empty array' });
        }
        if (!Array.isArray(job_suitable_for) || job_suitable_for.length === 0) {
            return res.status(400).json({ success: false, message: 'Job suitable for must be a non-empty array' });
        }

        // Create the Job document
        const newJob = await Job.create({
            title, job_desc, location, status, dept_name, work_exp, skills_req, salary, employement_type, opening_date, closing_date, education, job_suitable_for, responsibility, contact
        });

        if (!newJob) {
            res.status(200).json({
                success: false,
                message: "Cannot create job",
            });
        }

        await newJob.save();

        return res.status(201).json({
            success: true,
            message: "job created successfully",
            newJob
        });
    } catch (error) {
        next(new ServerError("Internal Server Error" + error.message, 501));
    }
}
const updateJob = async (req, res, next) => {
    try {

        const { jobId } = req.params;
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "job id is required"
            });
        }

        //check if the job is exist or not
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                success: false,
                message: "job not found"
            });
        }

        const {
            title, job_desc, location, status, dept_name, work_exp, skills_req, salary,
            employement_type, opening_date, closing_date, education, job_suitable_for,
            responsibility, contact
        } = req.body.data;

        // Basic validation
        if (!title || !location || !status || !dept_name || !work_exp || !skills_req || !salary || !employement_type || !opening_date || !job_suitable_for || !responsibility || !contact) {
            return res.status(400).json({ success: false, message: 'All required fields must be provided' });
        }
        // Additional validation if needed
        if (!Array.isArray(skills_req) || skills_req.length === 0) {
            return res.status(400).json({ success: false, message: 'Skills required must be a non-empty array' });
        }
        if (!Array.isArray(job_suitable_for) || job_suitable_for.length === 0) {
            return res.status(400).json({ success: false, message: 'Job suitable for must be a non-empty array' });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, {
            title, job_desc, location, status, dept_name, work_exp, skills_req, salary,
            employement_type, opening_date, closing_date, education, job_suitable_for,
            responsibility, contact
        });

        if (!updatedJob) {
            res.status(400).json({
                success: false,
                message: "Cannot update job"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            updatedJob
        });

    } catch (error) {
        next(new ServerError("Internal Server Error" + error.message, 501));
    }
}
const deleteJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job id is required"
            });
        }
        const deletedJob = await Job.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete job"
            });
        }
        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}

const getJobFilters = async (req, res, next) => {
    try {
        const jobFilterOptions = await Job.aggregate([
            {
                $group: {
                    _id: null,
                    titles: { $addToSet: "$title" },
                    work_exps: { $addToSet: "$work_exp" },
                    locations: { $addToSet: "$location" },
                    dept_names: { $addToSet: "$dept_name" }
                }
            },
            {
                $project: {
                    _id: 0,
                    titles: 1,
                    work_exps: 1,
                    locations: 1,
                    dept_names: 1
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Job filters fetched successfully",
            jobFilterOptions
        });
    } catch (error) {
        next(new ServerError("Internal Server Error", 400));
    }
}

export {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob,
    getJobFilters
}
