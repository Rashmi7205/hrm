import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

const NavBar = () => {
  const now = new Date();
  
  const time = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  const date = (new Intl.DateTimeFormat('en-IN',{
    dateStyle:'full'
  })).format(now);

  return (
    <nav className="w-full flex items-start justify-between border-2 px-8 py-2 rounded-lg">
      <div className="w-3/5 flex items-center gap-3">
        <Image src="/icons/search.svg" alt="search" width={20} height={20} />
        <input
          type="text"
          placeholder="Search By name,position"
          className="outline-none border-none text-sm"
        />
      </div>
      <div className="w-2/5 flex items-center gap-2 justify-center">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <span className="text-sm font-medium">{
            date
        }</span>
        <span>
          {time}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
