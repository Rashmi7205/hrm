"use client";
import { DataTableDemo } from '@/components/Datatable';
import { columns, JobDetails} from './columns';
import { getAllVacancies } from '@/actions/jobs/job.actions';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
  },[]);

  const statusList = [
    'All Vacancies',  
    'open',
    'completed',
    'inprogress'
  ];

  return (
    <main className='w-full flex flex-col overflow-hidden h-[90vh]'>
        <section className='w-full flex gap-3 items-center'>
            <h2 className='font-extrabold text-3xl'>Vacancies</h2>
            <div className='w-4/5 flex items-center justify-between'>
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
                        className='bg-slate-200'
                        onClick={()=>setView("card")}
                        >
                          <Image 
                          src="/icons/grid.svg"
                          width={20}
                          height={20}
                          alt='card view'
                          />
                          Card View
                        </Button>)
                      :(<Button
                        size="sm"
                        variant="outline"
                        className='bg-slate-200'
                        onClick={()=>setView("list")}
                        >
                          <Image 
                          src="/icons/grid.svg"
                          width={20}
                          height={20}
                          alt='list view'
                          />
        
                          List View
                        </Button>)
                    )
                  } 
                
            </div>
            <div className='w-1/5'>
                <Button>import</Button>
                <Button>Add Vacancy</Button>
            </div>
        </section>
        <div className='overflow-y-auto h-4/5'>
          { data && (<DataTableDemo data={data} columns={columns}/>)}
        </div>
    </main> 
  )
}

export default page