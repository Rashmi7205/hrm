"use client";
import { DataTableDemo } from "@/components/Datatable";
import { EmployeeData } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { empcolumns } from "./EmpColumns";
import { EmpCards } from "@/app/components/EmpCard";
import { Button } from "@/components/ui/button";
import { Download, LayoutGrid, List, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllEmployee } from "@/actions/employee";
import { departments, positions } from "@/app/constants/constanst";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const page = () => {
  const [empList, setEmplist] = useState<EmployeeData[]>();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"card" | "list">("card");
  const [selectedDepartment, setSelectedDepartment] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const router = useRouter();
  const getEmpData = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployee([...selectedDepartment,...selectedPosition]);
      setEmplist(data);
      setLoading(false);
    } catch (error: any) {
      toast(error.message);
    }
  };
  useEffect(() => {
    getEmpData();
  }, [selectedDepartment,selectedPosition]);
  return (
    <main className="w-full flex flex-col h-min-[90vh]">
      <section className="w-full flex gap-3 items-center flex-wrap justify-between">
        <div className="flex gap-3">
          <h2 className="font-extrabold text-2xl">Employees</h2>
          {view == "list" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setView("card")}
              className="text-xs"
            >
              <LayoutGrid size={14} />
              Card View
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setView("list")}
              className="text-xs"
            >
              <List size={14} />
              List View
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Select onValueChange={(val)=>{
             if(val === "All"){
              setSelectedDepartment([]);
              return;
            }
            if(!selectedDepartment.includes(val)){
                  setSelectedDepartment([...selectedDepartment,val]);
            }
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                <SelectItem value="All" className="upercase">All</SelectItem>
                {
                  departments.map((dept)=><SelectItem value={dept} className="uppercase">{dept}</SelectItem>)
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(val)=>{
            if(val === "All"){
              setSelectedPosition([]);
              return;
            }
            if(!selectedPosition.includes(val)){
                  setSelectedPosition([...selectedPosition,val]);
            }
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Position</SelectLabel>
                <SelectItem value="All" className="uppercase">All</SelectItem>
                {
                  positions.map((pos)=><SelectItem value={pos} className="uppercase">{pos}</SelectItem>)
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="secondary"
            className="bg-slate-100 text-blue-700 rounded-full text-xs"
          >
            <Download size={20} className="mx-1" />
            import
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-blue-500 text-white text-xs"
            onClick={() => router.push("/employees/create")}
          >
            <Plus size={20} />
            Add Employee
          </Button>
        </div>
      </section>
      <section className="w-full overflow-y-auto">
        {empList &&
          (view === "list" ? (
            <DataTableDemo
              data={empList}
              columns={empcolumns}
              searchBy="email"
            />
          ) : (
            <EmpCards items={empList} />
          ))}
      </section>
    </main>
  );
};

export default page;
