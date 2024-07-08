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
                throw("All Fields are mandatory");
            }
            const emp = {
                empinfo: {
                  fullname: empData.fullname,
                  position: empData.position,
                  dept: empData.dept,
                  doj: empData.doj,
                  phone: empData.phone,
                  email: empData.email
                },
                personalInfo: {
                  passNo: empData.passNo,
                  passExpDate: empData.passExpDate,
                  dob: empData.dob,
                  maritalStatus: empData.maritalStatus
                },
                bankInfo: {
                  accNo: empData.accNo,
                  bankName: empData.bankName,
                  panNo: empData.panNo,
                  ifscCode: empData.ifscCode
                },
                experience:empData.experience,
                skills:empData.skills
              }
            const {data} = await axios.post(`${apiUrl}/emp/new`,emp,{
                withCredentials:true
            });
            if(data){
              return data;
            }
        } catch (error) {
            return error;
        }
}

export const getEmpById  = async(empId:string)=>{
  try {
    if(!empId){
      throw new Error("Provide Emp Id");
    }
    const {data} = await axios.get(`${apiUrl}/emp/${empId}`,{
      withCredentials:true
    });
    if(data){
      return data.emp[0];
    }
  } catch (error) {
    return error;
  }
}