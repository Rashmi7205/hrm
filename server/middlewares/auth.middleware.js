import ServerError from "../utils/server.error.js";

export const authMiddleWare = (req,res,next)=>{
        try {
            const {hrmAuthToken} = req.cookies;
            if (!hrmAuthToken) {
                throw new ServerError("Cannot get auth token",404);
            }
            next();
        } catch (error) {
            return next(new ServerError("Unauthorized Access",404));
        }
}