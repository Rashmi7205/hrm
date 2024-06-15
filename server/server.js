import express from 'express';
import cors from 'cors';

import errorMiddleWare from './middlewares/error.middleware.js';
import jobRoutes from './Routes/job.routes.js';
import applicationRoutes from './Routes/app.routes.js';
import authRoutes from './Routes/user.routes.js';
import empRoutes from './Routes/emp.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/jobs',jobRoutes);
app.use('/api/application',applicationRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/emp',empRoutes);

app.all("*",async (req,res)=>{
    res.status(404).json({
        status:false,
        message:"Invalid route ! 404 page not found"
    });
})

app.use(errorMiddleWare);

export default app;