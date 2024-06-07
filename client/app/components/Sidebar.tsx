"use client";
import Image from 'next/image';
import { sideBarLinks } from '../constants/constanst';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const {user} = useUser();
    const pathname = usePathname();

    return (
    <div className='w-full h-full bg-slate-800 flex flex-col px-8 gap-5 py-10 text-white'>
        <div className='w-full flex flex-col items-center justify-center'>
            <Image 
            src="/icons/logo.svg"
            alt="logo"
            width={40}
            height={40}
            />
            <p className='text-3xl font-extrabold'>HRM</p>
            <p>{user && user.firstName}</p>
        </div>
        <ul className='text-xs'>
            {
                sideBarLinks.map((link)=>(<Link 
                className={`flex my-5 gap-4 px-4 py-3 rounded-full font-medium ${link.link === pathname?'bg-slate-700':''} `}
                key={link.name} href={link.link}>
                   <Image 
                   width={20}
                   height={20}
                   src={link.icon} alt={link.name}/>
                   <p>{link.name}</p>
                </Link>))
            }
        </ul>
    </div>
  )
}

export default Sidebar