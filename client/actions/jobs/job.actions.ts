import { Job } from "@/types";
import axios from "axios";

export const getAllVacancies = async (status:string|string[],search?:string[]) => {
  try {
    if(!status || status==="All Vacancies"){
        status  =["active","pending","inproggress"]
    }
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/all/`,{
        status,
        search
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getJobFilters = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/filters`
    );
    return data;
  } catch (error) {
    throw new Error("Cannot Get Job Filters");
  }
};

export const createVacancy = async (Jobdata:Job)=>{
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API_URL!}/jobs/create-job`,{
          title: Jobdata.title,
          job_desc: Jobdata.job_desc,
          location: Jobdata.location,
          status: Jobdata.status,
          dept_name: Jobdata.dept_name,
          work_exp: Jobdata.work_exp,
          skills_req: ["JavaScript", "Node.js", "React", "MongoDB"],
          salary: {
              currency: Jobdata.currency,
              amount:Jobdata.amount,
              per_time: Jobdata.per_time
          },  
          employement_type: Jobdata.employement_type,
          opening_date:Jobdata.opening_date ,
          closing_date: Jobdata.closing_date,
          education: Jobdata.education,
          job_suitable_for:Jobdata.job_suitable_for ,
          responsibility:Jobdata.responsibility,
          contact: {
              email: Jobdata.contact_person,
              phone: Jobdata.phone,
              contact_person:Jobdata.contact_person
          }
      });
      if(data.success){
        return true;
      }
      return false;
    } catch (error) {
       return false;
    }
}
