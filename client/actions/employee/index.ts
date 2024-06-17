import axios from "axios";

export const getAllEmployee = async ()=>{
        try {
            console.log("data");
            const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL!}/emp`);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
}