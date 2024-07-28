import { Button } from "@/components/ui/button";
import { Column, Id } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { Trash } from "lucide-react";
import {CSS} from '@dnd-kit/utilities';

interface ColumnContainerProps {
  column: Column;
  deleteColumn : (id:Id)=>void
}

const ColumnContainer = (props: ColumnContainerProps) => {
  const { column,deleteColumn } = props;
  const {setNodeRef,attributes,listeners,transform,transition,isDragging} = useSortable({
    id: column.id,
    data:{
      type:"Column",
      column
    }
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),

  }

  if(isDragging){
    return (
      <div 
      ref={setNodeRef}
      style={style}
      className="gap-4 bg-slate-700 w-[350px] min-h-[500px] rounded-md flex flex-col h-[500px]">
        {/* Column Title */}
        <div className="flex gap-2 wfull"
        {...attributes}
        {...listeners}
        >
          <div className="text-md h-[60px] rounded-md rounded-b-none font-bold border-4 w-full flex">
            <div className="flex justify-center items-center bg-slate-500 px-3 py-1 text-sm rounded-full">
              0 {column.title}
            </div>
            <Button onClick={()=>{
              deleteColumn(column.id);
            }}>
              <Trash/>
            </Button>
          </div>
        </div>
        {/* Column Task Container */}
        <div className="flex flex-grow">Conent</div>
        {/* Column Footer */}
        <div>Footer</div>
      </div>
    )
  }

  
  return (
    <div 
    ref={setNodeRef}
    style={style}
    className="gap-4 bg-slate-700 w-[350px] min-h-[500px] rounded-md flex flex-col h-[500px]">
      {/* Column Title */}
      <div className="flex gap-2 wfull"
      {...attributes}
      {...listeners}
      >
        <div className="text-md h-[60px] rounded-md rounded-b-none font-bold border-4 w-full flex">
          <div className="flex justify-center items-center bg-slate-500 px-3 py-1 text-sm rounded-full">
            0 {column.title}
          </div>
          <Button onClick={()=>{
            deleteColumn(column.id);
          }}>
            <Trash/>
          </Button>
        </div>
      </div>
      {/* Column Task Container */}
      <div className="flex flex-grow">Conent</div>
      {/* Column Footer */}
      <div>Footer</div>
    </div>
  );
};

export default ColumnContainer;
