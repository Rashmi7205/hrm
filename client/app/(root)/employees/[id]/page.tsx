"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";
import {
  BankInfo,
  Document,
  EmpExperience,
  EmpInfo,
  PersonalInfo,
  SalaryInfo,
} from "@/types";
import { useParams } from "next/navigation";
import { getEmpById, updateEmployee } from "@/actions/employee";
import Loader from "@/app/components/Loader";
import { AllSkills, departments, positions } from "@/app/constants/constanst";
import Image from "next/image";
import BadgeContainer from "@/app/components/BadgeContainer";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, File, Icon, Save, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DocumentAttachBtn from "@/app/components/Employee/DocumentAttachBtn";
import { toast } from "sonner";

export default function Component() {
  const { id }: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<File | null >(null);
  const [empInfo, setEmpInfo] = useState<EmpInfo>({
    fullname: "",
    position: "",
    dept: "",
    doj: "",
    phone: "",
    email: "",
    skills: [],
    maritalStatus: "",
    profile_pic:"#"
  });
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    passNo: "",
    passExpDate: new Date(),
    dob: new Date(),
  });

  const [bankInfo, setBankInfo] = useState<BankInfo>({
    accountNumber: "",
    bankName: "",
    panNo: "",
    ifscCode: "",
  });

  const [salaryInfo, setSalaryInfo] = useState<SalaryInfo>({
    pay_period: "",
    pay_status: "",
    pay_rate: 0,
  });
  const [experienceInfo, setExperienceInfo] = useState<EmpExperience[]>([]);
  const [documentInfo,setDocumentInfo] = useState<Document[]>([]);

  const addSkill = (newSkill: string) => {
    if (!empInfo.skills.includes(newSkill)) {
      setEmpInfo({ ...empInfo, skills: [...empInfo.skills, newSkill] });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = empInfo.skills.filter(
      (skill) => skill !== skillToRemove
    );
    setEmpInfo({ ...empInfo, skills: updatedSkills });
  };

  const empDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getEmpById(id);
      setEmpInfo({
        fullname: data.name,
        position: data.position,
        dept: data.dept_name,
        doj: data.doj,
        phone: data.phone_number,
        email: data.email,
        skills: data.skill,
        maritalStatus: data.marital_status,
        profile_pic:data?.profile_pic,
      });
     
      setPersonalInfo({
        dob:data.dob,
        passExpDate:data.passport_exp_date,
        passNo:data.passport_no
      })

      const { bankinfo, salary_info } = data;
      setBankInfo({
        accountNumber: bankinfo.account_number,
        bankName: bankinfo.name_of_bank,
        panNo: bankinfo.pan_no,
        ifscCode: bankinfo.ifsc_no,
      });
      setSalaryInfo({
        pay_period: salary_info.pay_period,
        pay_status: salary_info.status,
        pay_rate: salary_info.pay_rate,
      });
      setExperienceInfo(data.experience);
      setDocumentInfo(data.documents);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateExperienceDate = ({
    index,
    date,
    key,
  }: {
    index: number;
    date: Date;
    key: string;
  }) => {
    const exp = experienceInfo[index];
    const updatedExp = { ...exp, [key]: date };
    setExperienceInfo([
      ...experienceInfo.slice(0, index),
      updatedExp,
      ...experienceInfo.slice(index + 1),
    ]);
  };
  const handleExperienceInfoChange = (e,index:number)=>{
    const { name, value } = e.target;
    const newExperienceInfo = [...experienceInfo];
    newExperienceInfo[index] = {
      ...newExperienceInfo[index],
      [name]: value,
    };
    setExperienceInfo(newExperienceInfo);
  }

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEmpInfoChange = (e)=>{
    const { name, value } = e.target;
    setEmpInfo({...empInfo,[e.name]:e.value});
  }
  const handleSalaryInfoChange = (e)=>{
    const {name,value} = e.target;
    setSalaryInfo({...salaryInfo,[name]:value});
  }
  const handleBankInfoChange = (e)=>{
    const {name,value} = e.target;
    setBankInfo({...bankInfo,[name]:value});
    
  }
  const uploadDocument = (e:any,name:string)=>{
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentInfo([
          ...documentInfo,
          {
            document_name:name,
            document_url:URL.createObjectURL(file),
            document_file:reader?.result
          }
        ]);
      };
      reader.readAsDataURL(file);
     
    }
  }
  const removeDocument= (index:number)=>{
    setDocumentInfo([
      ...documentInfo.slice(0, index),
      ...documentInfo.slice(index + 1),
    ]);
  }
  const updateEmployeeDetails = async ()=>{
    setIsLoading(true);  
    const r = await updateEmployee({empId:id,personalInfo,empInfo,salaryInfo,bankInfo,experienceInfo,documentInfo,image});
    setIsLoading(false);
    console.log(r);
    toast("Updated Successfully");
  }




  useEffect(() => {
    empDetails();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-6 p-6 sm:p-8 md:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Employee Details - {empInfo.fullname}{" "}
            </h1>
            <Button 
            onClick={updateEmployeeDetails}
            className="flex items-center gap-2 bg-blue-2 text-hite">
              <Save/> Save
            </Button>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update employee's personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-[100px] h-[100px] rounded-md text-center relative">
                      <img
                        src={image || empInfo.profile_pic}
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-md"
                      />
                      {!image && !empInfo.profile_pic && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
                          {empInfo.fullname}
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" defaultValue={empInfo.fullname} onChange={handleEmpInfoChange}/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={empInfo.email}
                      onChange={handleEmpInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={empInfo.phone} 
                    onChange={handleEmpInfoChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select name="department" defaultValue={empInfo.dept} onValueChange={(val)=>{
                      setEmpInfo({
                        ...empInfo,
                        dept:val
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department, index) => (
                          <SelectItem key={index} value={department}>
                            {department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select name="position" defaultValue={empInfo.position} onValueChange={(val)=>{
                      setEmpInfo({
                        ...empInfo,
                        position:val
                      })
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder={empInfo.position} />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((position, index) => (
                          <SelectItem key={index} value={position}>
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select
                      name="maritalStatus"
                      defaultValue={empInfo.maritalStatus}
                      onValueChange={(val)=>{
                        setEmpInfo({
                        ...empInfo,
                        maritalStatus:val
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={empInfo.maritalStatus} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 flex flex-col">
                    <Label htmlFor="dob">D.O.B</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[280px] lg:w-[180px]  w-full justify-start text-left font-normal",
                            !personalInfo.dob && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {personalInfo.dob ? (
                            format(personalInfo.dob, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={personalInfo.dob}
                          onSelect={(date) => {
                              setPersonalInfo({
                                ...personalInfo,
                                dob: date
                              })
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bank Information</CardTitle>
                <CardDescription>
                  Update employee's bank details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input name="bankName" defaultValue={bankInfo.bankName} onChange={handleBankInfoChange}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      name="accountNumber"
                      defaultValue={bankInfo.accountNumber}
                      onChange={handleBankInfoChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ifscCode">IFSC Code</Label>
                    <Input name="ifscCode" defaultValue={bankInfo.ifscCode} 
                    onChange={handleBankInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNo">Pan Number</Label>
                    <Input name="panNo" defaultValue={bankInfo.panNo} 
                    onChange={handleBankInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passNo">PassPort Number</Label>
                    <Input name="passNo" defaultValue={personalInfo.passNo} 
                    onChange={(e)=>{
                      setPersonalInfo({...personalInfo,passNo:e.target.value})
                    }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="panNo">Passport Expiry</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[180px]  w-full justify-start text-left font-normal",
                            !personalInfo.passExpDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {personalInfo.passExpDate ? (
                            format(personalInfo.passExpDate, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={personalInfo.passExpDate}
                          onSelect={(date) => {
                              setPersonalInfo({
                                ...personalInfo,
                                passExpDate: date
                              })
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Update Employee Skills</CardDescription>
              </CardHeader>
              <CardContent>
                <BadgeContainer list={empInfo.skills} remove={removeSkill} />
                <Select onValueChange={(val) => addSkill(val)}>
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Salary Details</CardTitle>
                <CardDescription>
                  Update employee's salary details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pay_rate">Pay Rate</Label>
                    <Input name="pay_rate" defaultValue={salaryInfo.pay_rate}
                    onChange={handleSalaryInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pay_period">Payment Frequency</Label>
                    <Select
                      name="pay_period"
                      defaultValue={salaryInfo.pay_period}
                      onValueChange={(val)=>{
                        setSalaryInfo({
                          ...salaryInfo,
                          pay_period: val
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Anually">Anually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input name="status" defaultValue={salaryInfo.pay_status} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Update employee's documents</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {
                  documentInfo &&
                  documentInfo.map((document, index) => (
                    <div className="flex gap-4 items-center" key={index}>
                      <File/>
                      <Label htmlFor="document_name">{document.document_name}</Label>
                      <Button onClick={()=>removeDocument(index)}>
                        <Trash size={10} className="text-red-600"/>
                      </Button>
                    </div>
                  ))
                }
               <DocumentAttachBtn uploadDocument={uploadDocument}/>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Previous Experience</CardTitle>
              <CardDescription>Update Employee Experience</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {experienceInfo.map((experience, index) => (
                <div
                  key={experience._id}
                  className="grid grid-cols-1 gap-4 border rounded-md my-3 p-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      name="company_name"
                      defaultValue={experience.company_name}
                      onChange={(e)=>handleExperienceInfoChange(e,index)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">Roles and Responsibilities</Label>
                    <Textarea name="desc" defaultValue={experience.desc} 
                     onChange={(e)=>handleExperienceInfoChange(e,index)}
                    />
                  </div>
                  <Label htmlFor="Period">Duration</Label>
                  <div className="flex flex-wrap  gap-2 items-center justify-between">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[180px]  w-full justify-start text-left font-normal",
                            !experience.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {experience.from ? (
                            format(experience.from, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={experience.from}
                          onSelect={(date) => {
                            updateExperienceDate({ index, date, key: "from" });
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "md:w-[180px] w-full justify-start text-left font-normal",
                            !experience.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {experience.to ? (
                            format(experience.to, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={experience.to}
                          onSelect={(date) => {
                            updateExperienceDate({ index, date, key: "to" });
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
