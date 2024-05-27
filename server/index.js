import { config } from "dotenv";
import cors from 'cors';
import app from "./server.js";
import { connectToDb } from "./config/db.connection.js";

config();


app.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
    try {
        connectToDb();
    } catch (error) {
        console.log(error.message);     
    }
});