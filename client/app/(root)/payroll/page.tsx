"use client";
import '@/app/globals.css';
import { getAllEmployeeName } from "@/actions/employee";
import { createPayroll } from "@/actions/payroll";
import Label from "@/app/components/Label";
import PayrollTable from "@/app/components/PayrollTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Payroll } from "@/types";
import { CircleX, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EmpNameList {
  name: string;
  position: string;
  dept_name: string;
}
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [empNameList, setEmpNameList] = useState<EmpNameList[]>([]);
  const [empSalaryData, setEmpSalaryData] = useState({
    emp_id: "",
    dept_name: "",
    pay_period: "",
    pay_rate: "",
    emp_name: "",
    emp_position: "",
  });

  const getSelectedEmpDetails = (empName: string) => {
    const emp = empNameList.filter((emp) => {
      if (emp.name == empName) {
        return emp;
      }
    });
    //@ts-ignore
    setEmpSalaryData({
      ...empSalaryData,
      emp_name: empName,
      emp_id: emp[0]?.emp_id,
      emp_position: emp[0].position,
      dept_name: emp[0]?.department,
    });
  };

  const getEmpNameList = async () => {
    const data = await getAllEmployeeName();
    setEmpNameList(data);
  };

  const handleOpenCreatePayrollBtn = () => {
    setIsOpen(!isOpen);
  };

  const handleCreatePayroll = async () => {
    try {
      if (!empSalaryData) {
        toast("Field All the mandatoey Details");
        return;
      }
      if (!empSalaryData.dept_name) {
        toast("Please Select Department");
        return;
      }
      if (!empSalaryData.emp_name) {
        toast("Please Select Employee Name");
        return;
      }
      if (!empSalaryData.emp_position) {
        toast("Please Select Employee Position");
        return;
      }
      if (!empSalaryData.pay_period) {
        toast("Please Select Pay Period");return;
      }
      if (!empSalaryData.pay_rate) {
        toast("Please Enter Pay Rate");return;
      }
      const resp = await createPayroll(empSalaryData);
      if(resp){
        toast("Payroll Created Successfully");
      }
      setIsOpen(false);
    } catch (error) {}
  };


  useEffect(()=>{
    getEmpNameList();
  },[isOpen]);

  return (
    <main className="w-full flex flex-col h-min-[90vh]">
      <section className="w-full flex gap-3 items-center flex-wrap justify-between">
        <h1>Payroll</h1>
        <div>
          <Button
            size="sm"
            variant="secondary"
            className="bg-blue-500 text-white text-xs"
            onClick={handleOpenCreatePayrollBtn}
          >
            Add Payroll
          </Button>
        </div>
      </section>
      <section className="w-full overflow-y-auto">
          <PayrollTable />
      </section>
      <Sheet open={isOpen}>
        <SheetContent className="sm:max-w-full lg:w-[600px]">
          <SheetTitle className="flex items-center justify-between">
            <p>Add Salary</p>
            <Button
              size="sm"
              variant="secondary"
              className="bg-blue-500 text-white text-xs"
              onClick={handleCreatePayroll}
            >
              <Save size={10} />
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-500 text-red-500 text-xs"
              onClick={() => setIsOpen(false)}
            >
              <CircleX size={14} />
              Close
            </Button>
          </SheetTitle>
          <div className="w-full flex flex-col my-10 gap-3">
            <div className="w-full flex items-center justify-between">
              <Label title="Select Staff" desc="Employee Name" />
              <Select
                onValueChange={(val) => {
                  getSelectedEmpDetails(val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {empNameList &&
                    empNameList.map((emp: any) => (
                      <SelectItem value={emp?.name}>{emp?.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Select Position" desc="Employee position" />
              <Input
                placeholder="employee position"
                value={empSalaryData.emp_position}
                disabled
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Select Department" desc="Employee Department" />
              <Input
                placeholder="employee position"
                value={empSalaryData.dept_name}
                disabled
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="pay period" desc="Hourly ,monthly etc.." />
              <Select
                onValueChange={(val) => {
                  setEmpSalaryData({ ...empSalaryData, pay_period: val });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pay Period" className="uppercase" />
                </SelectTrigger>
                <SelectContent className="uppercase">
                  <SelectItem value="monthly">monthly</SelectItem>
                  <SelectItem value="hourly">hourly</SelectItem>
                  <SelectItem value="anually">anually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Pay rate" desc="payrate" />
              <Input placeholder="$123..." value={empSalaryData.pay_rate} name="pay_rate" onChange={(e)=>{
                setEmpSalaryData({...empSalaryData, pay_rate: e.target.value});
              }}/>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default page;
