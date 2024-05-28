import express from 'express';
import cors from 'cors';

import errorMiddleWare from './middlewares/error.middleware.js';
import jobRoutes from './Routes/job.routes.js';
import applicationRoutes from './Routes/app.routes.js';
import authRoutes from './Routes/user.routes.js';

const app = express();
app.use(cors({
    origin:"*",
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use('/api/jobs',jobRoutes);
app.use('/api/application',applicationRoutes);
app.use('/api/auth',authRoutes);

app.all("*",async (req,res)=>{
    res.status(404).json({
        status:false,
        message:"Invalid route ! 404 page not found"
    });
})

app.use(errorMiddleWare);

export default app;