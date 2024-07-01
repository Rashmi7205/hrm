"use client";
import { DatePickerDemo } from "@/app/components/DatePicker";
import Label from "@/app/components/Label";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, MapPin } from "lucide-react";

interface ExpDataType {
  company_name: string;
  designation: string;
  location:string;
  from: Date;
  to: Date;
  desc: string;
}

const page = () => {
  const [doj, setDoj] = useState<Date>();
  const [passExpDate, setPassExpDate] = useState<Date>();
  const [dob, setDob] = useState<Date>();
  const [exp, setExp] = useState<ExpDataType>();
  const [empData, setEmpData] = useState({
    fullname: "",
    position: "",
    dept: "",
    phone: "",
    email: "",
    passNo: "",
    maritalStatus: "",
    accNo: "",
    bankName: "",
    panNo: "",
    ifscCode: "",
    experience: [],
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const addExperience = ()=>{
    setEmpData({
      ...empData,
      experience:[...empData.experience,exp]
    });
    setIsSheetOpen(false); 
  }

  const handleExpChange = (e)=>{
    const {name, value} = e.target;
    setExp({...exp, [name]:value});
    
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <section></section>
      <form className="w-full flex flex-wrap gap-2">
        {/* Basic info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h3>Basic Information</h3>
          <div className="flex items-start justify-between gap-6 w-full">
            <Label title="Full Name" desc="Add employee Name" />
            <Input placeholder="employee name" type="text" name="fullname" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Position" desc="Choose position" />
            <Input placeholder="Position" type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="department" desc="Choose department" />
            <Input placeholder="department" type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label
              title="Date of Joining"
              desc="Choose the employees starting join data"
            />
            <DatePickerDemo
              title="select the employee's date of join"
              date={doj}
              setDate={setDoj}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Phone Number" desc="Only numbers" />
            <Input placeholder="000-000-000" type="number" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Email addredd" desc="Add employee Email" />
            <Input placeholder="@example.com" type="email" />
          </div>
        </div>
        {/* Personal info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h3>Personal Info</h3>
          <div className="flex items-start justify-between gap-6 w-full">
            <Label title="Passpost No." desc="Add passport no." />
            <Input placeholder="passpost no." type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Expiry date" desc="passport expiry date" />
            <DatePickerDemo
              title="Choose Expiry date"
              date={passExpDate}
              setDate={setPassExpDate}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label
              title="Date of Birth"
              desc="Choose the employees Birth date"
            />
            <DatePickerDemo
              title="select the Employee's date of Birth"
              date={dob}
              setDate={setDob}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Marital status" desc="select marital status" />
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
            <Label title="Bank Account No." desc="Add Bank Account no." />
            <Input placeholder="Enter account no" type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Bank Name" desc="Bank Name" />
            <Input placeholder="Enter BankName" type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Pan No" desc="Pan No." />
            <Input placeholder="Enter PAn No." type="text" />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="IFSC Code" desc="Ifsc code" />
            <Input placeholder="Enter IFSC Code" type="text" />
          </div>
        </div>
        {/* Exp info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h1>Experience</h1>
          <div className="w-full">
              {
                empData.experience.map((exp)=><div className="w-full">
                  <div className="flex items-center justify-between w-full">
                      <p className="font-bold">{exp?.designation}</p>
                      <p className="text-slate-300">{exp?.company_name}</p>
                  </div>
                  <div className="flex items-center justify-between w-full text-[14px]">
                  <p className="text-slate-300 flex"><Calendar size={14}/> {exp?.from} - <Calendar size={14}/> {exp?.to}</p>
                  <p className="text-slate-300 flex"><MapPin size={14}/> {exp?.location}</p>
                  </div>
                  <div>
                  {exp?.desc}
                  </div>
                </div>)
              }
            </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="w-[900px] sm:w-[540px]" >
              <SheetHeader className="wfull">
                <SheetTitle>Add Experience?</SheetTitle>
                <div className="container mx-auto mt-8 p-4">
                  <h2 className="text-2xl font-bold mb-4">Experience Form</h2>
                  <div className="experience-item mb-4 p-4 border rounded bg-gray-100">
                    <div className="mb-2">
                      <label className="block text-gray-700">
                        Company Name:
                      </label>
                      <input
                        type="text"
                        name="company_name"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">
                        Designation:
                      </label>
                      <input
                        type="text"
                        name="designation"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">
                        Location:
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">From:</label>
                      <input
                        type="date"
                        name="from"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">To:</label>
                      <input
                        type="date"
                        name="to"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700">
                        Description:
                      </label>
                      <input
                        type="text"
                        name="desc"
                        className="w-full px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={addExperience}
                  >
                    Save
                  </button>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          </div>
      </form>
    </main>
  );
};

export default page;
