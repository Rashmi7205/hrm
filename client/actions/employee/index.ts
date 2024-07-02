import { NewEmpType } from "@/types";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL!;
export const getAllEmployee = async ()=>{
        try {
            const {data} = await axios.post(`${apiUrl}/emp`);
           return data?.empList;
        } catch (error) {
            return error;
        }
}
export const addNewEmp = async (empData:NewEmpType)=>{
        try {
            if(!empData){
                
            }
        } catch (error) {
            return error;
        }
}