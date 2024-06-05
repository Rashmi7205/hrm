import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="h-screen w-full flex items-start">  
        <div className="w-[250px] h-full">
            <Sidebar/>
        </div>
        <div className="w-4/5 h-full flex flex-col items-center justify-start">
            <div className="w-full px-5 py-4 ">
                <NavBar/>
            </div>
            <section className="w-full px-5 py-8">
                {children}
            </section>
        </div>
    </main>
    );
}
export default RootLayout;