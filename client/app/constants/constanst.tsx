export const sideBarLinks = [
    {
        name: 'Dashboard',
        link: '/',
        icon:'/icons/dashboard.svg'
    },
    {
        name: 'Vacancies',
        link: '/vacancies',
        icon:'/icons/vacancies.svg'
    },
    {
        name: 'Applicants',
        link: '/applicants',
        icon:'/icons/user.svg'
    },
    {
        name: 'Employees',
        link: '/employees',
        icon:'/icons/employee.svg'
    },
    {
        name: 'Payroll',
        link: '/payroll',
        icon:'/icons/payroll.svg'
    },

];

export const empTypes = [
    {title:"Full Time",value:'fulltime'},
    {title:"Part Time",value:'parttime'},
    {title:"Contract",value:'contract'},
    {title:'Freelance',value:"freelance"},
    {title:"Remote",value:'remote'}
];
export const JobStatus = [
    'inprogress',
    'active',
    'pending',
    'completed'
] 

export const jobSuitbleFor =[
    {title:"All",value:"all"},
    {title:"Student",value:"student"},
    {title:"Veteran",value:"veteran"},
    {title:"Person With Disabilities",value:"person_with_disability"},
    {title:"Experienced",value:"experienced"}
];
export const SalaryOptions = {
    currecyList :[
        "INR",
        "EUR",
        "USD"
    ],
    perTime:[
        'hourly',
        'monthly',
        'anually'
    ]
}