import { LabelType } from "@/types"
import { Edit } from "lucide-react"

type EmpDetailsCardProps = {
    list:LabelType[],
    title: string,
    updateHandler?:()=>void
}

const EmpDetailsCard = ({list,title,updateHandler}:EmpDetailsCardProps) => {
  return (
    <div className="w-[300px] border py-5 px-3 rounded-md gap-4 text-xs flex flex-col mx-2">
        <div className="w-full flex items-center justify-between">
        <p className="font-bold text-md">{title}</p>
        <button className="flex items-center justify-around border rounded-full p-1"><Edit size={10}/> Edit</button>   
        </div>
        {
            list.map((listItem)=><div className="w-full flex items-center justify-between border-b py-1">
                <p className="font-medium text-slate-600">{listItem.label}</p>
                <p className="font-medium">{listItem.value}</p>
            </div>)
        }
    </div>
  )
}

export default EmpDetailsCard