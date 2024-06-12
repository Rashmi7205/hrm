import { DatePickerDemo } from "@/app/components/DatePicker";
import Label from "@/app/components/Label";
import { empTypes, JobStatus } from "@/app/constants/constanst";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Save } from "lucide-react";
import React from "react";

const CrateVacancyForm = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <section className="w-full flex justify-between">
        <h1 className="text-xl font-semibold tracking-wider">Create Vacancy</h1>
        <div className="flex gap-4">
          <Button className="bg-red-300 text-red-700 border border-red-900">
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white border border-blue-900">
            <Save size={13} />
            Save
          </Button>
        </div>
      </section>
      <section className="w-full flex flex-wrap">
        <div className="lg:w-1/2 sm:w-full">
          {/* Basic Info section */}
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3">
            <h2>Basic Inforamation</h2>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Title" desc="Add position name" />
              <Input placeholder="Position name" />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Department" desc="Add position name" />
              <Input placeholder="Position" />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label
                title="Job Description"
                desc="For effective candidate selection,enhance the job description with comprehensive details"
                required={true}
              />
              <Input placeholder="Enter Job description" />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label
                title="Employement Type"
                desc="Pick One or Multiple options"
              />
              <div className="w-full flex  text-sm gap-1 ">
                {empTypes.map((empType) => (
                  <div key={empType}>
                    <input type="checkbox" />
                    {empType}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <Label title="Job Location" desc="Chose the job location" />
              <Input placeholder="Location" />
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
              <Select>
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
              <DatePickerDemo title="Opening Date" />
              <DatePickerDemo title="Closing Date" />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-full">
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3">
            <h3 className="text-md font-semibold w-2/5 ">
              Applicant Requirements
            </h3>
            <div className="w-full flex items-center justify-between">
              <Label title="Work Experience" desc="Provide details About your experience"/>
              <Input value="no experience required" />
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="Education" desc="Select Education"/>
              <Input placeholder="education"/>
            </div>
            <div className="w-full flex items-center justify-between">
              <Label title="The Job is Suitable For" desc=""/>
            </div>
            <div className="w-full flex items-center justify-between"></div>
            <div className="w-full flex items-center justify-between"></div>
          </div>
          <div className="w-full border rounded-lg p-4 flex flex-col gap-3"></div>
        </div>
      </section>
    </main>
  );
};

export default CrateVacancyForm;
