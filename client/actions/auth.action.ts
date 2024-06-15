import { UserInfo } from "@/types";
import axios from "axios";
export const getUserInfo = async (userData:UserInfo)=>{
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/`,userData,{
            withCredentials:true
        });
        return data;
    } catch (error) {
        console.log(error);
    }    
}