"use client";
import { createVacancy } from "@/actions/jobs/job.actions";
import { DatePickerDemo } from "@/app/components/DatePicker";
import Label from "@/app/components/Label";
import {
  empTypes,
  JobStatus,
  jobSuitbleFor,
  SalaryOptions,
} from "@/app/constants/constanst";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Job } from "@/types";
import { create } from "domain";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CrateVacancyForm = () => {
  const [openDate,setOpenDate]=useState<Date>();
  const [closeDate,setCloseDate] = useState<Date>();
  const [selectedJobFor, setSelectedJobFor] = useState<string[]>([]);

  const [jobData, setJobData] = useState<Job>({
    title: "",
    job_desc: "",
    location: "",
    status: "",
    dept_name: "",
    work_exp: "",
    skills_req: [],
    currency: "",
    amount: "",
    per_time: "",
    employement_type: "",
    opening_date: "",
    closing_date: "",
    education: "",
    job_suitable_for: [],
    responsibility: "",
    email: "",
    phone: "",
    contact_person: "",
  });

  const handleSelectJobSuit =(event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedJobFor(prevValues => {
      if (checked) {
        // Add value to the selected values
        return [...prevValues, value];
      } else {
        // Remove value from the selected values
        return prevValues.filter(item => item !== value);
      }
    });
  };

  const handleCreateVacancy = async ()=>{
      try {
          const isCreated:Boolean = await createVacancy({
            ...jobData,
            opening_date:openDate?.toString(),
            closing_date:closeDate?.toString(),
            job_suitable_for:selectedJobFor
          });
          if(isCreated){
            toast("New Vacancy Created");
          }
          else{
            toast("Failded to create a new vacancy");
          }
      } catch (error) {
          toast("Failded to create a new vacancy");
      }
  }

  return (
    <main className="w-full h-full flex flex-col gap-2">
      <section className="w-full flex justify-between">
        <h1 className="text-xl font-semibold tracking-wider">Create Vacancy</h1>
        <div className="flex gap-4">
          <Button className="bg-red-300 text-red-700 border border-red-900">
            Cancel
          </Button>
          <Button 
          onClick={handleCreateVacancy}
          className="bg-blue-600 text-white border border-blue-900">
            <Save size={13} />
            Save
          </Button>
        </div>
      </section>
      <section className="w-full flex flex-wrap justify-around">
        <div className="lg:w-[49%] sm:w-full">
          {/* Basic Info section */}
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3">
            <h2>Basic Inforamation</h2>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Title" desc="Add position name" />
              <Input
                placeholder="Position name"
                name="title"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Department" desc="Add position name" />
              <Input
                placeholder="Department"
                name="dept_name"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label
                title="Job Description"
                desc="For effective candidate selection,enhance the job description with comprehensive details"
                required={true}
              />
              <Input
                placeholder="Enter Job description"
                name="job_desc"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label
                title="Employement Type"
                desc="Pick One or Multiple options"
              />
              <div className="w-full flex  text-sm gap-1 ">
                  <Select onValueChange={(value)=>setJobData({
                    ...jobData,
                    employement_type:value
                  })}>
                    <SelectTrigger>Select Type</SelectTrigger>
                    <SelectContent>
                       {
                        empTypes.map((emp)=><SelectItem value={emp.value}>{emp.title}</SelectItem>)
                       }
                    </SelectContent>
                  </Select>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Location" desc="Chose the job location" />
              <Input
                placeholder="Location"
                name="location"
                onChange={(e) =>
                  setJobData({ ...jobData, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Salary" desc="Choose how you prefer for this job" />
              <div className="w-full flex gap-0.5">
                <Select onValueChange={(value)=>{
                  setJobData({
                    ...jobData,
                    currency:value
                  })
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {SalaryOptions.currecyList.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="salary" name="amount" onChange={(e)=>setJobData({...jobData,[e.target.name]:e.target.value})} />
                <Select onValueChange={(value)=>{
                  setJobData({
                    ...jobData,
                    per_time:value
                  })
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="monthly" />
                  </SelectTrigger>
                  <SelectContent>
                    {SalaryOptions.perTime.map((pt) => (
                      <SelectItem key={pt} value={pt}>
                        {pt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label
                title="Multiple Candidates"
                desc="This will be displayed in on job page"
              />
              <input type="checkbox" /> Yes,I am hiring Multiple candidate
            </div>
          </div>
          {/* Dates and status Section */}
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3 my-3">
            <div className="w-full flex items-center justify-between">
              <h3 className="text-md font-semibold w-2/5 ">Dates And Status</h3>
              <p className="text-xs text-slate-400">
                This Section provides a snapshot of when the vacancy opened.any
                closing date (if applicable) and its current status in the
                hiring process
              </p>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Vacancy Status" desc="Choose Current stage" />
              <Select onValueChange={(value)=>setJobData(
                {...jobData,
                  status:value
                }
              )}>
                <SelectTrigger>
                  <SelectValue placeholder="chosse status" />
                </SelectTrigger>
                <SelectContent>
                  {JobStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full flex items-center justify-between gap-1">
              <Label title="Opening & Closing Date" desc="(if applcable)" />
              <DatePickerDemo title="Opening Date" date={openDate} setDate={setOpenDate} />
              <DatePickerDemo title="Closing Date" date={closeDate} setDate={setCloseDate} />
            </div>
          </div>
        </div>
        <div className="lg:w-[49%] sm:w-full">
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-md font-semibold w-2/5 ">
              Applicant Requirements
            </h3>
            <div className="w-full flex items-center justify-between">
              <Label
                title="Work Experience"
                desc="Provide details About your experience"
              />
              <Input  name="work_exp" onChange={(e)=>setJobData({
                ...jobData,
                [e.target.name]:e.target.value
              })}/>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Education" desc="Select Education" />
              <Input placeholder="education" name="education" onChange={(e)=>setJobData({
                ...jobData,
                [e.target.name]:e.target.value
              })} />
            </div>
            <div className="w-full flex items-center justify-around">
              <Label title="The Job is Suitable For" desc="" />
              {jobSuitbleFor.map((jsf) => (
                <div className="text-xs flex mx-2">
                  <input type="checkbox" id={jsf.value}
                     value={jsf.value}
                     checked={selectedJobFor.includes(jsf.value)}
                     onChange={handleSelectJobSuit} />
                  <label htmlFor={jsf.value}>{jsf.title}</label>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-between">
              <Label
                title="Responsibilities"
                desc="Main Tasks that the candidate will be accountable for in this role"
              />
              <textarea
                placeholder={`Planning and executing..\nensure the function... \nsupporting Process...`}
                rows={5}
                className="text-xs w-full border p-2 rounded"
                name="responsibility"
                onChange={(e)=>setJobData({
                  ...jobData,
                  [e.target.name]:e.target.value
                }
                )}
              />
            </div>

            <div className="w-full flex items-center justify-between">
              <Label
                title="Duties"
                desc="Main Tasks that the candidate will be accountable for in this role"
              />
              <textarea
                placeholder={`Planning and executing..\nensure the function... \nsupporting Process...`}
                rows={5}
                className="text-xs w-full border p-2 rounded"
                name="skills_req"
              />
            </div>
          </div>
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-md font-semibold w-2/5 ">
              Contact Information
            </h3>
            <div className="w-full flex items-center justify-between">
              <Label
                title="Contact Person"
                desc="Person to contact for inquires"
              />
              <Input type="text" placeholder="Position Name" name="contact_person" onChange={(e)=>{
                setJobData(
                  {
                    ...jobData,
                    [e.target.name]:e.target.value
                  }
                )
              }}/>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Contact Phone" desc="Phone for inquires" />
              <Input type="text" placeholder="Phone number" name="phone"
              onChange={(e)=>setJobData({
                ...jobData,
                [e.target.name]:e.target.value
              })}
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Label
                title="Additional Contact"
                desc="Extra contact Info if needed"
              />
              <Input type="text" placeholder="email" 
              name="email"
              onChange={(e)=>setJobData({
                ...jobData,
                [e.target.name]:e.target.value
              })
              }
              />
            </div>
            <div className="w-full flex items-center justify-between">
              <Label
                title="Show contact"
                desc="This will be displayed on job page"
              />
              <input type="checkbox" />
              <p className="text-xs">
                Show the name and phone number on this job page
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CrateVacancyForm;
