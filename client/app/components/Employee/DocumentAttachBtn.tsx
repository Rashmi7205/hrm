import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip } from "lucide-react";
import { ChangeEvent } from "react";

const DocumentAttachBtn = ({
  uploadDocument,
}: {
  uploadDocument: (e: any,name:string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-4">
          <Paperclip className="rounded-full bg-blue-1 p-0.5 text-white" /> Attach
          Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="document_name"
              defaultValue="Certificate,Resume etc..."
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              File
            </Label>
            <Input
              id="document_file"
              type="file"
              onChange={(e:ChangeEvent)=>{
                const documentNameInput = document.getElementById('document_name') as HTMLInputElement;
                uploadDocument(e, documentNameInput?.value || e.target.files?.[0].name || '');
              }}
              className="col-span-3"
              accept="*.docx,*.pdf"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentAttachBtn;
