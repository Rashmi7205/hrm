import axios from "axios";

export const getAllVacancies = async()=>{
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/all/`);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}