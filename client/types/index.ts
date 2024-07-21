// Define enum for application status
export enum ApplicationStatus {
  NEW = "new",
  IN_PROGRESS = "inprogress",
  COMPLETED = "completed",
  PENDING = "pending",
}

// Define interfaces for the nested objects
export interface PreviousExperience {
  // Add properties as needed
  // For example:
  companyName?: string;
  position?: string;
  duration?: string;
}

export interface EducationInfo {
  institute_name?: string;
  course?: string;
  startedAt?: Date;
  endedAt?: Date;
}

// Define the main interface for the schema
export interface Applicant {
  name: string;
  job_id: string; // Assuming ObjectId will be represented as string in frontend
  status: ApplicationStatus;
  mob_no: string;
  email: string;
  resume: string;
  prev_exp: PreviousExperience[];
  skills?: string[];
  education_info: EducationInfo[];
}

export interface JobDetails {
  salary: {
    currency: string;
    amount: string;
    per_time: string;
  };
  contact: {
    email: string;
    phone: string;
    contact_person: string;
  };
  _id: string;
  title: string;
  job_desc: string;
  location: string;
  status: string;
  dept_name: string;
  work_exp: string;
  skills_req: string[];
  employement_type: string;
  opening_date: string;
  closing_date: string;
  education: string;
  job_suitable_for: string[];
  responsibility: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  applicants: Applicant[];
}
export interface Filter {
  dept_names: string[];
  locations: string[];
  work_exps: string[];
  titles: string[];
}

export type Job = {
  title: string;
  job_desc: string;
  location: string;
  status: string;
  dept_name: string;
  work_exp: string;
  skills_req: string[];
  currency: string;
  amount: string;
  per_time: string;
  employement_type: string;
  opening_date: string | undefined;
  closing_date: string | undefined;
  education: string;
  job_suitable_for: string[];
  responsibility: string;
  email: string;
  phone: string;
  contact_person: string;
};
export interface UserInfo {
  firstName: string | null;
  lastName: string |null;
  email:string | null;
  username: string | null;
  clerk_id: string|null;
  imageUrl:string|null;
  fullName: string|null;
  lastSignInAt: Date|null;
}

export interface ExpDataType {
  company_name: string;
  designation: string;
  location: string;
  from: Date;
  to: Date;
  desc: string;
}

export interface NewApplicant{
  name:string,
  email:string,
  job_id:string,
  phone: string,
  experience: string,
  otherInfo:string,
  resume:File,
  skills:[String],
  linkedinLink:string,
  githubLink:string,
  educations: [
    {
      instituteName: string,
      period: {
        from: null | Date,
        to: null | Date,
      },
      course: string,
      courseType: string,
      universityName: string,
    },
  ],
 
}

export interface EmployeeData{
    _id: string;
    name: string;
    position: string;
    dept_name: string;
    date_of_joining: Date,
    phone_number: string;
    email:string;
}

export interface NewEmpType{
  fullname: string,
  position: string,
  dept: string,
  phone: string,
  email: string,
  passNo: string,
  maritalStatus: string,
  accNo: string,
  bankName: string,
  panNo: string,
  ifscCode: string,
  doj:Date |undefined, 
  dob:Date | undefined,
  passExpDate:Date,
  skills:string[],
  experience: [
    {company_name: string;
  designation: string;
  location:string;
  from: Date;
  to: Date;
  desc: string;}
  ]
}
export interface LabelType {
  label: string;
  value:string;
}
export interface Payroll{
    emp_id:string,
    pay_period:string,
    pay_rate:string,
    status?:string,
    emp_name:string,
    emp_email?:string,
    emp_position:string
}
