import express from 'express';
import errorMiddleWare from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.all("*",async (req,res)=>{
    res.status(404).json({
        status:false,
        message:"Invalid route ! 404 page not found"
    });
})

app.use(errorMiddleWare);

export default app;