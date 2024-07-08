"use client";
import { DatePickerDemo } from "@/app/components/DatePicker";
import Label from "@/app/components/Label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar, MapPin, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { AllSkills, departments, positions } from "@/app/constants/constanst";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BadgeContainer from "@/app/components/BadgeContainer";
import { ExpDataType } from "@/types";
import { addNewEmp } from "@/actions/employee";



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
  const addExperience = () => {
    setEmpData({
      ...empData,
      //@ts-ignore
      experience: [...empData.experience, exp],
    });
    setIsSheetOpen(false);
  };

  const handleExpChange = (e: any) => {
    const { name, value } = e.target;
    //@ts-ignore
    setExp({ ...exp, [name]: value });
  };

  const handleEmpDataChange = (e: any) => {
    const { name, value } = e.target;
    setEmpData({
      ...empData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const response = await addNewEmp({
        ...empData,
        doj,
        passExpDate,
        dob,
        skills
      });
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      toast(error.message);
    }
  };
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = (newSkill: string) => {
    if (!skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <section>
        <Button onClick={handleCreate}>Save</Button>
      </section>
      <form className="w-full flex flex-wrap gap-2">
        {/* Basic info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h3>Basic Information</h3>
          <div className="flex items-start justify-between gap-6 w-full">
            <Label title="Full Name" desc="Add employee Name" />
            <Input
              placeholder="employee name"
              type="text"
              name="fullname"
              onChange={handleEmpDataChange}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Position" desc="Choose position" />
            {/* <Input placeholder="Position" type="text" name="position" onChange={handleEmpDataChange} /> */}
            <Select
              name="position"
              onValueChange={(val) => {
                setEmpData({ ...empData, position: val });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position: string) => (
                  <SelectItem value={position} key={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="department" desc="Choose department" />

            <Select
              name="dept"
              onValueChange={(val) => {
                setEmpData({ ...empData, dept: val });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department: string) => (
                  <SelectItem value={department} key={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Input
              placeholder="000-000-000"
              type="text"
              name="phone"
              onChange={handleEmpDataChange}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Email addredd" desc="Add employee Email" />
            <Input
              placeholder="@example.com"
              type="email"
              name="email"
              onChange={handleEmpDataChange}
            />
          </div>
        </div>
        {/* Personal info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h3>Personal Info</h3>
          <div className="flex items-start justify-between gap-6 w-full">
            <Label title="Passpost No." desc="Add passport no." />
            <Input
              placeholder="passpost no."
              type="text"
              name="passNo"
              onChange={handleEmpDataChange}
            />
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
              <input
                type="radio"
                name="maritalStatus"
                onChange={handleEmpDataChange}
                value="single"
              />{" "}
              single
              <input
                type="radio"
                name="maritalStatus"
                onChange={handleEmpDataChange}
                value="maried"
              />{" "}
              Maried
              <input
                type="radio"
                name="maritalStatus"
                onChange={handleEmpDataChange}
                value="divorced"
              />{" "}
              Divorced
            </div>
          </div>
        </div>
        {/* Bank Information */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h3>Bank Information</h3>
          <div className="flex items-start justify-between gap-6 w-full">
            <Label title="Bank Account No." desc="Add Bank Account no." />
            <Input
              placeholder="Enter account no"
              type="text"
              name="accNo"
              onChange={handleEmpDataChange}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Bank Name" desc="Bank Name" />
            <Input
              placeholder="Enter BankName"
              type="text"
              name="bankName"
              onChange={handleEmpDataChange}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="Pan No" desc="Pan No." />
            <Input
              placeholder="Enter PAn No."
              type="text"
              name="panNo"
              onChange={handleEmpDataChange}
            />
          </div>
          <div className="flex items-center justify-between gap-6 w-full">
            <Label title="IFSC Code" desc="Ifsc code" />
            <Input
              placeholder="Enter IFSC Code"
              type="text"
              name="ifscCode"
              onChange={handleEmpDataChange}
            />
          </div>
        </div>
        {/* Exp info */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h1>Experience</h1>
          <div className="w-full">
            {empData.experience.map((exp) => (
              <div className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="font-bold">{exp["designation"]}</p>
                  <p className="text-slate-300">{exp["company_name"]}</p>
                </div>
                <div className="flex items-center justify-between w-full text-[14px]">
                  <p className="text-slate-300 flex">
                    <Calendar size={14} /> {exp["from"]} -{" "}
                    <Calendar size={14} /> {exp["to"]}
                  </p>
                  <p className="text-slate-300 flex">
                    <MapPin size={14} /> {exp["location"]}
                  </p>
                </div>
                <div>{exp["desc"]}</div>
              </div>
            ))}
          </div>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="flex gap-3 font-semibold">
              <PlusCircle size={20} className="text-blue-600" /> Add Work
              Experience
            </SheetTrigger>
            <SheetContent className="sm:max-w-[800px]">
              <SheetHeader className="wfull">
                <SheetTitle>Add Experience</SheetTitle>
                <div className="container mx-auto mt-8 p-4">
                  <h2 className="text-2xl font-bold mb-4">Experience Form</h2>
                  <div className="experience-item mb-4 p-4 border rounded">
                    <div className="mb-2 flex">
                      <Label title="Job Title" desc="Job title" />
                      {/* <Input
                        type="text"
                        name="designation"
                        className=" px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      /> */}
                      <Select
                        name="designation"
                        onValueChange={(val) => {
                          setExp({ ...exp, designation: val });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Title" />
                        </SelectTrigger>
                        <SelectContent>
                          {positions.map((position: string) => (
                            <SelectItem value={position} key={position}>
                              {position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mb-2 flex">
                      <Label title="Company name" desc="Company Name" />
                      <Input
                        type="text"
                        name="company_name"
                        className=" px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2 flex">
                      <Label title="Location" desc="Company Location" />
                      <input
                        type="text"
                        name="location"
                        className=" px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2 flex">
                      <Label title="Period OF Work" desc="Period Of Work" />
                      <Input
                        type="date"
                        name="from"
                        placeholder="Start Date"
                        className=" px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                      <Input
                        type="date"
                        name="to"
                        placeholder="End Date"
                        className=" px-3 py-2 border rounded"
                        onChange={handleExpChange}
                      />
                    </div>
                    <div className="mb-2 flex">
                      <Label
                        title="Responsibilites"
                        desc="Responsibilites of the work"
                      />
                      <textarea
                        name="desc"
                        className="px-3 py-2 border rounded w-full"
                        onChange={handleExpChange}
                      ></textarea>
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
        {/* Skill Container */}
        <div className="p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg">
          <h1>Add Skills</h1>
          <BadgeContainer list={skills} remove={removeSkill} loadingText="No Skills Selected"  />
          <Select onValueChange={(val)=>addSkill(val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Skills" />
            </SelectTrigger>
            <SelectContent>
              {AllSkills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </form>
    </main>
  );
};

export default page;
