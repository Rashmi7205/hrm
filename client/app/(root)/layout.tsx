import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="h-screen w-full flex items-start justify-between">  
        <div className="lg:w-[230px] h-full">
            <Sidebar/>
        </div>
        <div className="lg:w-[calc(100vw-220px)] md:w-full h-full flex flex-col items-center justify-start">
            <div className="w-full px-5 py-4 ">
                <NavBar/>
            </div>
            <section className="w-full px-5 py-2 overflow-y-auto">
                {children}
            </section>
        </div>
    </main>
    );
}
export default RootLayout;