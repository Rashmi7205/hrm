"use client";
import { LabelType } from "@/types";
import { CalendarIcon, Edit, Key } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DatePickerDemo } from "./DatePicker";

type EmpDetailsCardProps = {
  list: LabelType[];
  title: string;
  updateHandler: ({key,value,type}:{key:string,value:string,type?:string}) => void;
};

const EmpDetailsCard = ({
  list,
  title,
  updateHandler,
}: EmpDetailsCardProps) => {

  const [isOpen,setIsOpen] = useState(false);
  const handleInputChange = (e:any)=>{
    const {name,value} = e.target;
    if(title.toLocaleLowerCase() == "personal info"){
      updateHandler({key:name,value,type:"personal_info"});
    }
    if(title.toLocaleLowerCase() == "bank details"){
      updateHandler({key:name,value,type:"bank_info"});
    }
    if(title.toLocaleLowerCase() == "salary details"){
      updateHandler({key:name,value,type:"salary_info"});
    }
  }
  const setDate = (date:Date)=>{
    console.log("jjj");
  } 

  return (
    <>
      <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col mx-2">
        <div className="w-full flex items-center justify-between">
          <p className="font-bold text-md">{title}</p>
          <Dialog open={isOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center justify-around border rounded-full p-1"
              onClick={()=>setIsOpen(true)}
              >
                <Edit size={10} /> Edit
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                {list.map((listItem) => (
                  <div className="w-full flex items-center justify-between py-1">
                    <Label className="font-medium text-slate-600 w-2/5">
                      {listItem.label}
                    </Label>
                    {listItem.label?.toLocaleLowerCase()?.includes("date") ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !new Date(listItem.value)  && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {new Date(listItem.value).toLocaleDateString()}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={new Date(listItem.value)}
                            onSelect={(date)=>{
                              if (date) {
                                console.log(date);
                                // updateHandler({
                                //   key: listItem.name,
                                //   value: date.toISOString(), // Ensure date is in correct format
                                //   type: "personal_info"
                                // });
                              } else {
                                console.log("No date selected");
                              }
                            
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Input
                        className="font-medium"
                        value={listItem.value}
                        type="text"
                        name={listItem.name}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button 
              onClick={()=>{
                setIsOpen(false);
              }}
              >Cancel</Button>
              <Button
              onClick={()=>setIsOpen(false)}
              >Update</Button>
            </DialogContent>
          </Dialog>
        </div>
        {list.map((listItem) => (
          <div className="w-full flex items-center justify-between border-b py-1">
            <p className="font-medium text-slate-600">{listItem.label}</p>
            <p className="font-medium">{listItem.value}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmpDetailsCard;
