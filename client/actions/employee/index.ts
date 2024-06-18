import axios from "axios";

export const getAllEmployee = async ()=>{
        try {
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL!}/emp`);
           return data?.empList;
        } catch (error) {
            return error;
        }
}