import { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="h-screen w-full flex items-start">  
        <div className="w-[250px] h-full">
            <Sidebar/>
        </div>
        <div className="w-4/5 h-full flex flex-col items-center justify-start">
            <div className="w-full">
                Navbar
            </div>
            <section className="w-full">
                {children}
            </section>
        </div>
    </main>
    );
}
export default RootLayout;