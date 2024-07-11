"use client";

import { getEmpById } from "@/actions/employee";
import EditExperienceModal from "@/app/components/EditExperienceModal";
import EmpDetailsCard from "@/app/components/EmpDetailsCard";
import { getFormattedTime } from "@/helpers";
import { ExpDataType, LabelType } from "@/types";
import { Calendar, Edit, Loader, Mail, MapPin, PhoneCall, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const { id }: { id: string } = useParams();
  const [empData, setEmpData] = useState();
  const [bankInfoLabels, setBankInfoLabels] = useState<LabelType[]>([]);
  const [personalInfoLabels, setPersonalInfoLabels] = useState<LabelType[]>([]);
  const [salaryLabels, setSalaryLabels] = useState<LabelType[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [experience, setExperience] = useState<ExpDataType[]>([]);

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
      const bankinfo = data.bankinfo[0];
      setBankInfoLabels([
        {
          label: "Bank Name",
          value: bankinfo.name_of_bank,
        },
        {
          label: "Account Number",
          value: bankinfo.account_number,
        },
        {
          label: "IFSC Code",
          value: bankinfo.ifsc_no,
        },
        {
          label: "Pan No",
          value: bankinfo.pan_no,
        },
      ]);
      //add personal info labels
      setPersonalInfoLabels([
        {
          label: "Passport No.",
          value: data.passport_no,
        },
        {
          label: "Passport Exp Date",
          value: getFormattedTime(data.passport_exp_date),
        },
        {
          label: "Phone Number",
          value: data.phone_number,
        },
        {
          label: "Marital Status",
          value: data.marital_status,
        },
      ]);
      //add salay info lebels
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
   
  }, []);
  return (
    <main className="w-full flex items-center justify-center">
      {empData ? (
        <div className="w-full flex items-start justify-start">
          <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col">
            <div className="w-full flex gap-3 items-center justify-between">
              <User
                size={70}
                className="bg-slate-600 text-white p-1 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="text-pretty font-bold tracking-wider">
                  {empData?.name}
                </p>
                <p className="text-center bg-yellow-400 font-medium text-xs rounded-lg p-1">
                  {empData?.position}
                </p>
              </div>
            </div>
            <div className="w-full flex gap-3 items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-slate-500">Department</p>
                <p className="font-semibold">{empData['dept_name']}</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-slate-500">Date Of Joining</p>
                <p className="font-semibold">
                  {empData['date_of_joining']
                    ? new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(empData['date_of_joining']))
                    : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-1 border dark:bg-slate-900 p-3 rounded-md w-full bg-slate-300">
              <span className="text-sm flex gap-1 items-center border-b p-1">
                <Mail size={14} />
                {empData['email']}
              </span>
              <span className="text-sm flex gap-1 items-center">
                <PhoneCall size={14} />
                {empData['phone_number']}
              </span>
            </div>
          </div>
          {personalInfoLabels && (
            <EmpDetailsCard list={personalInfoLabels} title="Personal Info" />
          )}
          {bankInfoLabels && (
            <EmpDetailsCard list={bankInfoLabels} title="Bank Details" />
          )}
          <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col">
            <div className="w-full">
              <p className="text-md font-bold">Experience</p>
              <button 
              onClick={handleEdit}
              className="flex items-center justify-around border rounded-full p-1"><Edit size={10}/> Edit</button> 
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
        <Loader className="spin" />
      )}
    </main>
  );
};

export default page;
