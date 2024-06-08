"use client";
import { DataTableDemo } from '@/components/Datatable';
import { columns, JobDetails} from './columns';
import { getAllVacancies } from '@/actions/jobs/job.actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlignLeftIcon, Download, LayoutGrid, Plus } from 'lucide-react';
import JobFilters from '@/app/components/JobFilters';
import VacCard from '@/app/components/VacCard';

const page = () => {
  const [data, setData] = useState<JobDetails[]|null>(null);
  const getJobData = async ()=>{
     const res = await getAllVacancies();
     setData(res?.jobs);
  }
  const [statusSelected, setStatusSelected] = useState<string|null>("All Vacancies");
  const [view, setView] = useState<string|null>("list");
  useEffect(()=>{
    getJobData();
  },[view]);

  const statusList = [
    'All Vacancies',  
    'open',
    'completed',
    'inprogress'
  ];

  return (
    <main className='w-full flex flex-col h-min-[90vh]'>
        <section className='w-full flex gap-3 items-center flex-wrap'>
            <h2 className='font-extrabold text-3xl'>Vacancies</h2>
            <div className='w-3/5 flex items-center justify-between'>
                <div className='flex gap-2'>{
                  statusList.map((status)=><Button 
                  size="sm" 
                  variant="outline"
                  onClick={()=>setStatusSelected(status)}
                  className={`
                    ${statusSelected===status?"bg-blue-500 text-white":"bg-slate-300 text-black"}
                  `}>{status}</Button>)  
                  }</div>
                  {
                    view && (
                      view==="list"
                      ?(<Button
                        size="sm"
                        variant="outline"
                        className='bg-slate-200 text-sm'
                        onClick={()=>setView("card")}
                        >
                         <LayoutGrid size={20}/>
                          Card View
                        </Button>)
                      :(<Button
                        size="sm"
                        variant="outline"
                        className='bg-slate-200'
                        onClick={()=>setView("list")}
                        >
                          <AlignLeftIcon size={20}/>
                          List View
                        </Button>)
                    )
                  } 
                
            </div>
            <div className='w-1/5 flex gap-3'>
                <Button 
                size="sm"
                variant="secondary"
                className='bg-slate-100 text-blue-700 rounded-full text-xs'
                >
                  <Download size={20} className='mx-1'/>                  
                  import</Button>
                <Button 
                size="sm"
                variant="secondary"
                className='bg-blue-500 text-white text-xs'
                >
                <Plus size={20}/>
                Add Vacancy</Button>
            </div>
        </section>
        <div className='overflow-y-hidden h-4/5 flex flex-row items-start justify-around gap-1'>
          <div className='lg:w-4/5 flex flex-wrap gap-2 items-center justify-around my-3'>
            {/* {data && (<DataTableDemo data={data} columns={columns}/>)} */}
            {data && (data.map((item)=><VacCard data={item}/>))}
          </div>
          <div className='lg:w-1/5'>
            <JobFilters/>
          </div>
        </div>
    </main> 
  )
}

export default page