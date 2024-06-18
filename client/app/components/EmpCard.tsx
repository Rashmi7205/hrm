import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmployeeData } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const EmpCards = ({
  items,
  className,
}: {
  items: EmployeeData[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10 gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/employees/${item?._id}`}
          key={item?._id}
          className="relative group  block p-2 h-full  w-[350px] border rounded-lg"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="flex flex-col items-center gap-2">
            <div className="w-full flex gap-2">
              <User className="p-2 bg-purple-300 rounded-md" size={40} />
              <div className="flex flex-col ">
                <p className="font-semibold">{item.name}</p>
                <p className="font-medium">{item.position}</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-sm text-slate-300">Department</p>
                <p>{item.dept_name}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-slate-300">Date Of Joining</p>
                <p>
                  {new Date(item.date_of_joining).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex flex-col  gap-1 border dark:bg-slate-900 p-3 rounded-md w-full bg-slate-300">
                <span className="text-sm flex gap-1 items-center border-b p-1"><Mail size={14}/>{item.email}</span>
                <span className="text-sm flex gap-1 items-center"><PhoneCall size={14}/>{item.phone_number}</span>
            </div>
            <div className="my-2 flex w-full gap-1">
                <Link href={`/employees/${item?._id}`}  className="w-1/2 ">Edit</Link>
                <Link href={`/employees/${item?._id}`} className="w-1/2 bg-blue-600">View</Link >
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
