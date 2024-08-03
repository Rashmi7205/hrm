import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SignedIn, UserButton } from "@clerk/nextjs";
import {LayoutGridIcon, MenuIcon, SearchIcon} from 'lucide-react';
import Link from 'next/link';
import { sideBarLinks } from '../constants/constanst';
import Image from 'next/image';
import { ThemeBtn } from './ThemeBtn';

const Navbar1 = () => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full dark:bg-dark-1 bg-light-1">
    <header className="fixed top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              prefetch={false}
            >
              <LayoutGridIcon className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {
              sideBarLinks.map((sidebarItem)=>(
                <Link href={sidebarItem.link} className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
              <Image
              src={sidebarItem.icon}
              alt={sidebarItem.name}
              width={20}
              height={20} />
              {sidebarItem.name}
            </Link>
              ))
            }
          </nav>
        </SheetContent>
      </Sheet>
     
      <div className="relative  flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[436px]"
        />
      </div>
      <div className='relative ml-auto '>
            <ThemeBtn/>
      </div>
      <SignedIn>
          <UserButton />
        </SignedIn>
    </header>
    </div>
  )
}

export default Navbar1