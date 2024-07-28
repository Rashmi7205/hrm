"use client";

import { getEmpById } from "@/actions/employee";
import BadgeContainer from "@/app/components/BadgeContainer";
import EditExperienceModal from "@/app/components/EditExperienceModal";
import EmpDetailsCard from "@/app/components/EmpDetailsCard";
import Loader from "@/app/components/Loader";
import { AllSkills } from "@/app/constants/constanst";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getFormattedTime } from "@/helpers";
import { ExpDataType, LabelType } from "@/types";
import { Calendar, Edit, Mail, MapPin, PhoneCall, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id }: { id: string } = useParams();
  const [empData, setEmpData] = useState();
  const [bankInfoLabels, setBankInfoLabels] = useState<LabelType[]>([]);
  const [personalInfoLabels, setPersonalInfoLabels] = useState<LabelType[]>([]);
  const [salaryLabels, setSalaryLabels] = useState<LabelType[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [experience, setExperience] = useState<ExpDataType[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const handleEdit = () => {
    setIsSheetOpen(true);
  };

  const handleSave = (updatedExperience: ExpDataType[]) => {
    setExperience(updatedExperience);
  };

  const getData = async () => {
    try {
      const data = await getEmpById(id);
      setEmpData(data);
      setExperience(data.experience);
      //add bankinfo labels
      const bankinfo = data.bankinfo;
      setBankInfoLabels([
        {
          label: "Bank Name",
          value: bankinfo.name_of_bank,
          name: "name_of_bank",
        },
        {
          label: "Account Number",
          value: bankinfo.account_number,
          name: "account_number",
        },
        {
          label: "IFSC Code",
          value: bankinfo.ifsc_no,
          name: "ifsc_no",
        },
        {
          label: "Pan No",
          value: bankinfo.pan_no,
          name: "pan_no",
        },
      ]);
      //add personal info labels
      setPersonalInfoLabels([
        {
          label: "Passport No.",
          value: data.passport_no,
          name: "passport_no",
        },
        {
          label: "Passport Exp Date",
          value: getFormattedTime(data.passport_exp_date),
          name: "passport_exp_date",
        },
        {
          label: "Phone Number",
          value: data.phone_number,
          name: "phone_number",
        },
        {
          label: "Marital Status",
          value: data.marital_status,
          name: "marital_status",
        },
      ]);
      //add salay info lebels
      const salaryinfo = data.salary_info;
      setSalaryLabels([
        {
          label: "Pay Basis",
          value: salaryinfo.pay_period,
          name: "pay_period",
        },
        {
          label: "Pay Rate",
          value: salaryinfo.pay_rate,
          name: "pay_rate",
        },
        {
          label: "Status",
          value: salaryinfo.status,
          name: "status",
        },
      ]);
      setSkills(data?.skill);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEmpInfo = ({
    key,
    value,
    type,
  }: {
    key: string;
    value: string;
    type?: string;
  }) => {
    if (type === "personal_info") {
      //@ts-ignore
      setEmpData({ ...empData, [key]: value });
      setPersonalInfoLabels((prevLabels) =>
        prevLabels.map((item) =>
          item.name === key ? { ...item, value: value } : item
        )
      );
    }
    if (type === "salary_info") {
      //@ts-ignore
      setEmpData({...empData,salary_info:{...empData.salary_info,
          [key]: value
        }
      });
      setSalaryLabels((prevLabels) =>
        prevLabels.map((item) =>
          item.name === key ? { ...item, value: value } : item
        )
      );
    }
    if (type == "bank_info") {
      //@ts-ignore
      setEmpData({...empData,bankinfo: {...empData?.bankinfo,
          [key]: value,
        },
      });
      setBankInfoLabels((prevLabels) =>
        prevLabels.map((item) =>
          item.name === key ? { ...item, value: value } : item
        )
      );
    }
  
  };

  const addSkill = (newSkill: string) => {
    if (!skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const updateEmpData = async ()=>{
      console.log(empData);
      console.log(experience);
      console.log(skills);

  }


  useEffect(() => {
    getData();
  }, [setBankInfoLabels, setPersonalInfoLabels, setSalaryLabels]);
  return (
    <main className="w-full flex items-center justify-center overflow-x-hidden">
      {empData ? (
        <div className="w-full flex items-start justify-start flex-wrap gap-y-4">
           <button
      onClick={updateEmpData}
      >
        Save
      </button>
          <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col">
            <div className="w-full flex gap-3 items-center justify-between">
              <User
                size={70}
                className="bg-slate-600 text-white p-1 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="text-pretty font-bold tracking-wider">
                  {empData['name']}
                </p>
                <p className="text-center bg-yellow-400 font-medium text-xs rounded-lg p-1">
                  {empData['position']}
                </p>
              </div>
            </div>
            <div className="w-full flex gap-3 items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-slate-500">Department</p>
                <p className="font-semibold">{empData["dept_name"]}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-slate-500">Date Of Joining</p>
                <p className="font-semibold">
                  {empData["date_of_joining"]
                    ?getFormattedTime(empData['date_of_joining'])
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-1 border dark:bg-slate-900 p-3 rounded-md w-full bg-slate-300">
              <span className="text-sm flex gap-1 items-center border-b p-1">
                <Mail size={14} />
                {empData["email"]}
              </span>
              <span className="text-sm flex gap-1 items-center">
                <PhoneCall size={14} />
                {empData["phone_number"]}
              </span>
            </div>
          </div>
          {personalInfoLabels && (
            <EmpDetailsCard
              list={personalInfoLabels}
              title="Personal Info"
              updateHandler={handleEditEmpInfo}
            />
          )}
          {bankInfoLabels && (
            <EmpDetailsCard list={bankInfoLabels} title="Bank Details" updateHandler={handleEditEmpInfo} />
          )}
          {salaryLabels && (
            <EmpDetailsCard list={salaryLabels} title="Salary Details"  updateHandler={handleEditEmpInfo}/>
          )}
            <div className="w-[300px] p-5 flex flex-col items-start justify-between lg:w-[49%] sm:w-full border rounded-lg mx-2">
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
          <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col">
            <div className="w-full">
              <p className="text-md font-bold">Experience</p>
              <button
                onClick={handleEdit}
                className="flex items-center justify-around border rounded-full p-1"
              >
                <Edit size={10} /> Edit
              </button>
            </div>
            {experience.map((exp) => (
              <div className="w-full flex-col ">
                <div className="flex items-center justify-between w-full my-2">
                  <p className="font-bold text-md">{exp["designation"]}</p>
                  <p className="text-slate-300">{exp["company_name"]}</p>
                </div>
                <div className="flex items-center justify-between w-full text-[14px] my-2">
                  <p className="text-slate-300 flex">
                    <Calendar size={14} /> {getFormattedTime(exp["from"])} -{" "}
                    <Calendar size={14} /> {getFormattedTime(exp["to"])}
                  </p>
                  <p className="text-slate-300 flex">
                    <MapPin size={14} /> {exp["location"]}
                  </p>
                </div>
                <div>{exp["desc"]}</div>
              </div>
            ))}
          </div>
          <EditExperienceModal
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            experience={experience}
            onSave={handleSave}
          />
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default page;
