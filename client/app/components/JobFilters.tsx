"use client";
import { getJobFilters } from "@/actions/jobs/job.actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const JobFilters = () => {
    
    const [filters, setFilters] = useState(null);
    const [search,setSearch] = useState({
        locations:[],
        dept_names:[],
        titles:[],
        work_exps:[]
    }); 
    
    const getAllFilter = async()=>{
         try {
            const res = await getJobFilters();
            setFilters(res?.jobFilterOptions);
            
         } catch (error : any) {
             toast(error.message);
         }
     
     } 
     const handleSearch = ()=>{

     }
     
    useEffect(()=>{
        getAllFilter();
    },[]);


    return (
    <div className="flex flex-col h-min-[100%] w-full p-2 border-2  rounded-xl my-8 ">
        <div className="w-full flex items-center justify-between">
            <p className="text-lg font-bold">Vacancies Filter</p>
            <Button variant="link" size="sm">Clear All</Button>
        </div>
        {
            filters ? (
                <div>
               <p className="font-semibold">Department</p> 
               <div className="flex flex-wrap gap-0.5">
                <span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.dept_names.length?"":"bg-blue-500 text-white")}>All</span>
               {
                   //@ts-ignore
                    {...filters[0]}.dept_names.splice(0,5).map((dept)=><span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.dept_names.includes(dept)?"bg-blue-500 text-white":"")}>{dept}</span>)
               }
              </div>
                <p className="font-semibold">Position Type</p>
               <div className="flex flex-wrap gap-0.5">
               <span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.titles.length?"":"bg-blue-500 text-white")}>All</span>
                {
                    //@ts-ignore
                     {...filters[0]}.titles.splice(0,5).map((title)=><span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.titles.includes(title)?"bg-blue-500 text-white":"")}>{title}</span>)
                }
               </div>
               <p className="font-semibold">Work Experience</p>
               <div className="flex flex-wrap gap-0.5">
                   <span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.work_exps.length?"":"bg-blue-500 text-white")}>All</span>
               {
                   //@ts-ignore
                    {...filters[0]}.work_exps.splice(0,5).map((exp)=><span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.work_exps.includes(exp)?"bg-blue-500 text-white":"")}
                    onClick={handleSearch}
                    >{exp}</span>)
               }
              </div>
               <p className="font-semibold">Locations</p>
              <div className="flex flex-wrap gap-0.5">
                  <span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.locations.length?"":"bg-blue-500 text-white")}
                  >All</span>
               {
                   //@ts-ignore
                    {...filters[0]}.locations.splice(0,5).map((location)=><span className={"text-xs border rounded-xl  px-2 py-2 cursor-pointer "+(search.locations.includes(location)?"bg-blue-500 text-white":"")}
                   onClick={handleSearch}
                    >{location}</span>)
               }
              </div>
              </div>
            )
            :(
                <div>
                    No Filter option Available
                </div>
            )
        }
    </div>
  )
}

export default JobFilters