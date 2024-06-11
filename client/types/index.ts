// Define enum for application status
export enum ApplicationStatus {
    NEW = 'new',
    IN_PROGRESS = 'inprogress',
    COMPLETED = 'completed',
    PENDING = 'pending'
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
    applicants:Applicant[]
  };
export interface Filter {
  dept_names:string[];
  locations:string[];
  work_exps:string[];
  titles:string[];
};
