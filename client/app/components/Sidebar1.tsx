"use client";
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tooltip } from '@radix-ui/react-tooltip';
import Link from 'next/link';
import { sideBarLinks } from '../constants/constanst';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar1 = () => {
 const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-blue-1 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            {
              sideBarLinks.map((sidebarItem)=>(
                <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={sidebarItem.link}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 hover:bg-blue-500 bg-blue-2 shadow-xl
                    ${pathname === sidebarItem.link?"bg-blue-600":""}`}
                    prefetch={false}
                  >
                    <Image 
                    src={sidebarItem.icon}
                    height={20}
                    width={20}
                    alt={sidebarItem.name}
                    />
                    <span className="sr-only">{sidebarItem.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{sidebarItem.name}</TooltipContent>
              </Tooltip>
              ))
            }
          </TooltipProvider>
        </nav>
      </aside>
  )
}

export default Sidebar1