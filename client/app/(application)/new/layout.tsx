import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="h-screen w-full flex items-center justify-center">  
            {
                children
            }
        </main>
    );
}
export default RootLayout;