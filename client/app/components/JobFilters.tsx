"use client";
import { getJobFilters } from "@/actions/jobs/job.actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FilterBox from "./FilterBox";
const JobFilters = () => {
    
    const [filters, setFilters] = useState(null);
    const [search,setSearch] = useState<[string]|[]>([]); 
    
    const getAllFilter = async()=>{
         try {
            const res = await getJobFilters();
            setFilters(res?.jobFilterOptions[0]);          
         } catch (error : any) {
             toast(error.message);
         }
     
     } 
     const handleSearch = (e:any)=>{
            const value  = e.target.value;
            //@ts-ignore
            if(search && search.includes(value)){
                search.unshift(value);
                setSearch(search);
            }else{
                //@ts-ignore
                setSearch([...search,value]);
            }
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
                    <FilterBox title="Department" list={filters?.dept_names} search={search} onclick={handleSearch}/>
                    <FilterBox title="Position Type" list={filters?.titles} search={search} onclick={handleSearch}/>
                    <FilterBox title="Year of experience" list={filters?.work_exps} search={search}  onclick={handleSearch}/>
                    <FilterBox title="location" list={filters?.locations} search={search} onclick={handleSearch}/>
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