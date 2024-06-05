import { Router } from 'express';
import  {getAllJobs,getJobById,createJob,updateJob,deleteJob, getJobFilters} from '../controllers/job.controller.js';

const jobRoutes = Router();

jobRoutes.post('/all',getAllJobs);
jobRoutes.post('/create-job',createJob);
jobRoutes.post('/update-job/:jobId',updateJob);
jobRoutes.delete('/delete-job/:jobId',deleteJob);
jobRoutes.get('/job/:jobId',getJobById);
jobRoutes.get('/filters',getJobFilters);
export default jobRoutes;
