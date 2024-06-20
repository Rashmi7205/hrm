"use client";
import { DatePickerDemo } from "@/app/components/DatePicker"
import Label from "@/app/components/Label"
import { Input } from "@/components/ui/input"
import { useState } from "react";

const page = () => {
  const [doj, setDoj] = useState<Date>();
  const [passExpDate, setPassExpDate] = useState<Date>();
  const [dob,setDob] = useState<Date>();
  const [empData,setEmpData] = useState({
    fullname:"",
    position:"",
    dept:"",
    phone:"",
    email:"",
    passNo:"",
    maritalStatus:"",
    accNo:"",
    bankName:"",
    panNo:"",
    ifscCode:"",
    experience:[]
  });
  
  return (
   <main className="w-full h-full flex flex-col gap-2">
      <section></section>
      <form className="w-full flex flex-wrap gap-2">
          {/* Basic info */}
          <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
            <h3>Basic Information</h3>
            <div className="flex items-start justify-between gap-6 w-full">
              <Label title="Full Name" desc="Add employee Name"/>
              <Input placeholder="employee name" type="text" name="fullname"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Position" desc="Choose position"/>
              <Input placeholder="Position" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="department" desc="Choose department"/>
              <Input placeholder="department" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Date of Joining" desc="Choose the employees starting join data"/>
              <DatePickerDemo title="select the employee's date of join" date={doj} setDate={setDoj}/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Phone Number" desc="Only numbers"/>
              <Input placeholder="000-000-000" type="number"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Email addredd" desc="Add employee Email"/>
              <Input placeholder="@example.com" type="email"/>
            </div>
          </div>  
          {/* Personal info */}
          <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
            <h3>Personal Info</h3>
            <div className="flex items-start justify-between gap-6 w-full">
              <Label title="Passpost No." desc="Add passport no."/>
              <Input placeholder="passpost no." type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Expiry date" desc="passport expiry date"/>
              <DatePickerDemo title="Choose Expiry date" date={passExpDate} setDate={setPassExpDate}/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Date of Birth" desc="Choose the employees Birth date"/>
              <DatePickerDemo title="select the Employee's date of Birth" date={dob} setDate={setDob}/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Marital status" desc="select marital status"/>
              <div className="flex gap-2">
                  <input type="radio" name="marital_status" /> single
                  <input type="radio" name="marital_status" /> Maried
                  <input type="radio" name="marital_status" /> Divorced
              </div>
            </div>
          </div>  
          {/* Bank Information */}
          <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
            <h3>Bank Information</h3>
            <div className="flex items-start justify-between gap-6 w-full">
              <Label title="Bank Account No." desc="Add Bank Account no."/>
              <Input placeholder="Enter account no" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Bank Name" desc="Bank Name"/>
              <Input placeholder="Enter BankName" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Pan No" desc="Pan No."/>
              <Input placeholder="Enter PAn No." type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="IFSC Code" desc="Ifsc code"/>
              <Input placeholder="Enter IFSC Code" type="text"/>
            </div>
          </div> 
          <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
            <h3>Basic Information</h3>
            <div className="flex items-start justify-between gap-6 w-full">
              <Label title="Full Name" desc="Add employee Name"/>
              <Input placeholder="employee name" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Position" desc="Choose position"/>
              <Input placeholder="Position" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="department" desc="Choose department"/>
              <Input placeholder="department" type="text"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Date of Joining" desc="Choose the employees starting join data"/>
              <DatePickerDemo title="select the employee's date of join" date={doj} setDate={setDoj}/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Phone Number" desc="Only numbers"/>
              <Input placeholder="000-000-000" type="number"/>
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              <Label title="Email addredd" desc="Add employee Email"/>
              <Input placeholder="@example.com" type="email"/>
            </div>
          </div>   
      </form>
   </main>
  )
}

export default page