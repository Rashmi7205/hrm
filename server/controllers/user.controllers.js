import User from '../schemas/user.schema.js';
import { generateAuthToken } from '../utils/authToken.js';
import ServerError from '../utils/server.error.js';



const authorizeUser = async (req,res,next)=>{
    try {
        const {clerk_id,firstName,lastName,username,email,img_url,password} = req.body;

        if(!clerk_id || !email){
            return next(new ServerError("Required Fields are missing",400));
        }
        const isUserExist = await User.find({clerk_id:clerk_id});
        if(isUserExist.length > 0){
            const hrmAuthToken = await generateAuthToken(clerk_id);
          console.log(hrmAuthToken);
            if(!hrmAuthToken){
                return next(new ServerError("Internal Server error",501));
            }
            return res.cookie("hrmAuthToken", hrmAuthToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'none' // Ensure 'none' is a string
            }).json({
                success: true
            });
        }else{
            const newUser = await User.create({
                clerk_id,
                firstName,
                lastName,
                username,
                email,
                img_url,
                password,
                phoneNumbers:[]
            });

            await newUser.save();
            if(!newUser){
                return next(new ServerError("Failed To create a new user",400));
            }
            const hrmAuthToken = await generateAuthToken(newUser.clerk_id);
            if(!hrmAuthToken){
                return next(new ServerError("Internal Server error",501));
            }
            return res.status(200).cookie("hrmAuthToken",hrmAuthToken,{
                httpOnly:true,
                secure:true
                }).json({
                    success:true,
                    message:"User created",
                    newUser                    
                });
        }
    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }  
} 

export {
    authorizeUser
}