import { Router } from 'express';
import  {getAllJobs,getJobById,createJob,updateJob,deleteJob} from '../controllers/job.controller.js';

const jobRoutes = Router();

jobRoutes.get('/all',getAllJobs);
jobRoutes.post('/create-job',createJob);
jobRoutes.post('/update-job/:jobId',updateJob);
jobRoutes.delete('/delete-job/:jobId',deleteJob);
jobRoutes.get('/job/:jobId',getJobById);
export default jobRoutes;
