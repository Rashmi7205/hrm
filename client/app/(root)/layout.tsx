import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";
import Sidebar1 from "../components/Sidebar1";
import Navbar1 from "../components/Navbar1";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
    <main className="flex min-h-screen w-full justify-between ">  
        <Sidebar1/>
        <div className="lg:w-[94%] md:w-[90%] w-full absolute inset-y-0 md:right-7">
            <Navbar1/>
        {
            children
         }
        </div>
       
       {/* <div className="lg:w-[230px] h-full">
            <Sidebar/>
        </div>
        <div className="lg:w-[calc(100vw-220px)] md:w-full h-full flex flex-col items-center justify-start">
            <div className="w-full px-5 py-4 ">
                <NavBar/>
            </div>
            <section className="w-full px-5 py-2 overflow-y-auto">
                {children}
            </section>
        </div>*/}
    </main>
    );
}
export default RootLayout;