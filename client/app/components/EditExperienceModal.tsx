import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ExpDataType } from "@/types";
import React, { useState, ChangeEvent } from "react";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface EditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExpDataType[];
  onSave: (experience: ExpDataType[]) => void;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({
  isOpen,
  onClose,
  experience,
  onSave,
}) => {
  const [formData, setFormData] = useState<ExpDataType[]>(experience);

  const handleChange = (
    index: number,
    key: keyof ExpDataType,
    value: string
  ) => {
    const updatedExperience = [...formData];
    //@ts-ignore
    updatedExperience[index][key] = value;
    setFormData(updatedExperience);
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Experience</SheetTitle>
          <SheetDescription>
            Edit your job experience details below.
          </SheetDescription>
        </SheetHeader>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
        {formData.map((exp, index) => (
          <div key={index} className="flex flex-col gap-3">
            <p className="text-md font-medium underline">
              Experience - {index}
            </p>
            <Input
              type="text"
              value={exp.designation}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "designation", e.target.value)
              }
            />
            <Input
              type="text"
              value={exp.company_name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "company_name", e.target.value)
              }
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !exp.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exp.from ? format(exp.from, "PPP") : <span>Select From Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={exp.from}
                  onSelect={(date)=>{
                    handleChange(index, "from", date?.toDateString())
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* <Input
              type="date"
              value={exp.from}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "from", e.target.value)
              }
            /> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !exp.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {exp.to ? format(exp.to, "PPP") : <span>Select From Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={exp.to}
                  onSelect={(date)=>{
                    console.log(date);
                  //    handleChange(index, "from", date)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="text"
              value={exp.location}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "location", e.target.value)
              }
            />
            <textarea
              value={exp.desc}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, "desc", e.target.value)
              }
            ></textarea>
          </div>
        ))}
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditExperienceModal;
