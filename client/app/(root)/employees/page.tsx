"use client";
import { getAllEmployee } from '@/actions/employee'
import { DataTableDemo } from '@/components/Datatable';
import { EmployeeData } from '@/types';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { empcolumns } from './EmpColumns';

const page =() => {
  const [empList,setEmplist] = useState<EmployeeData[]>();
  const [loading,setLoading] = useState(false);
  const [view,setView] = useState<'card'|'list'>('list');
  const getEmpData = async ()=>{
    try {
      setLoading(true);
      const data = await getAllEmployee();
      setEmplist(data);
      setLoading(false);
    } catch (error:any) {
      toast(error.message);
    }
  }
  useEffect(()=>{
    getEmpData();
  },[]);
  return (
    <main className='w-full flex flex-col h-min-[90vh]'>
        <section></section>
        <section className='w-full overflow-y-auto'>
          {
            empList && (view === "list" ?(
              <DataTableDemo data={empList} columns={empcolumns} searchBy='email'/>
            ):(
              <div>
                card
              </div>
            ))
          }
        </section>
    </main>
  )
}

export default page