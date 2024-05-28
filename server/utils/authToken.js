import bcrypt from 'bcrypt';
export const generateAuthToken = async (clerk_id)=>{
    try {
        const authToken = bcrypt.hash(clerk_id,10);
        return authToken;
    } catch (error) {
        return false;
    }
}