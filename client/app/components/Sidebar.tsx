"use client";
import Image from 'next/image';
import { sideBarLinks } from '../constants/constanst';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { List, ListIcon } from 'lucide-react';

const Sidebar = () => {
    const { user } = useUser();
    const pathname = usePathname();

    return (
        <div className='flex h-full'>
            {/* Sidebar for larger screens */}
            <div className='hidden md:flex flex-col w-64 bg-slate-800 text-white p-6'>
                <div className='flex flex-col items-center mb-8'>
                    <Image 
                        src="/icons/logo.svg"
                        alt="logo"
                        width={40}
                        height={40}
                    />
                    <p className='text-3xl font-extrabold mt-2'>HRM</p>
                    <p>{user && user.firstName}</p>
                </div>
                <ul className='text-sm tracking-wider'>
                    {sideBarLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.link} 
                            className={`flex items-center my-5 gap-4 px-4 py-3 rounded-full font-medium ${link.link === pathname ? 'bg-slate-700' : ''}`}
                        >
                            <Image 
                                width={20}
                                height={20}
                                src={link.icon} 
                                alt={link.name}
                            />
                            <p>{link.name}</p>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Sidebar for smaller screens */}
            <div className='md:hidden'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" className='text-white'>
                            <ListIcon className='text-black'/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='w-64 bg-slate-800 text-white p-6'>
                        <div className='flex flex-col items-center mb-8'>
                            <Image 
                                src="/icons/logo.svg"
                                alt="logo"
                                width={40}
                                height={40}
                            />
                            <p className='text-3xl font-extrabold mt-2'>HRM</p>
                            <p>{user && user.firstName}</p>
                        </div>
                        <ul className='text-xs'>
                            {sideBarLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.link} 
                                    className={`flex items-center my-5 gap-4 px-4 py-3 rounded-full font-medium ${link.link === pathname ? 'bg-slate-700' : ''}`}
                                >
                                    <Image 
                                        width={20}
                                        height={20}
                                        src={link.icon} 
                                        alt={link.name}
                                    />
                                    <p>{link.name}</p>
                                </Link>
                            ))}
                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    )
}

export default Sidebar;
