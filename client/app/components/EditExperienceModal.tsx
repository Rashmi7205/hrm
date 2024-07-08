import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ExpDataType } from '@/types';
import React, { useState, ChangeEvent } from 'react';


interface EditExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: ExpDataType[];
  onSave: (experience: ExpDataType[]) => void;
}

const EditExperienceModal: React.FC<EditExperienceModalProps> = ({ isOpen, onClose, experience, onSave }) => {
  const [formData, setFormData] = useState<ExpDataType[]>(experience);

  const handleChange = (index: number, key: keyof ExpDataType, value: string) => {
    const updatedExperience = [...formData];
    updatedExperience[index][key] = value;
    setFormData(updatedExperience);
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit Experience</SheetTitle>
        <SheetDescription>Edit your job experience details below.</SheetDescription>
      </SheetHeader>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button onClick={handleSave}>Save</Button>
      {formData.map((exp, index) => (
        <div key={index} className="flex flex-col gap-3">
            <p className='text-md font-medium underline'>Experience - {index}</p>
          <Input
            type='text'
            value={exp.designation}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'designation', e.target.value)}
          />
          <Input
          type='text'
            value={exp.company_name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'company_name', e.target.value)}
          />
          <Input
            type="date"
            value={exp.from}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'from', e.target.value)}
          />
          <Input
            type="date"
            value={exp.to}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'to', e.target.value)}
          />
          <Input
          type="text"
            value={exp.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'location', e.target.value)}
          />
          <textarea
            value={exp.desc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'desc', e.target.value)}
          ></textarea>
        </div>
      ))}
      <SheetFooter>
      </SheetFooter>
    </SheetContent>
  </Sheet>
  );
};

export default EditExperienceModal;
