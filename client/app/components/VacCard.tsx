import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, CalendarRange, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobDetails } from "@/types";

const VacCard = ({ data }: {data:JobDetails}) => {
  return (
    <div className="p-5 flex flex-col gap-3 bg-slate-100 items-center w-[300px] rounded-lg shadow-lg dark:bg-slate-800">
      <div className="flex flex-row justify-between w-full">
        <BriefcaseBusiness className="bg-slate-200 p-1 rounded-md dark:bg-slate-900" />
        <p className="font-semibold">{data.title}</p>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col gap-1">
          <p className="text-sm flex p-1">
            <MapPin/>
            {data.location}
            </p>
          <p className="text-sm flex p-1">
            <CalendarRange/>
            {new Date(data.createdAt).toLocaleDateString("en-In", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={data.status} />
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="font-semibold">
          Total Applicants  
          {data.applicants.length}
        </p>
        <Button size="sm">View</Button>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusLower = status.toLowerCase();

  if (statusLower === "completed") {
    return (
      <Badge
        variant="outline"
        className="bg-green-200 font-medium py-1 text-green-700"
      >
        {status}
      </Badge>
    );
  } else if (statusLower === "inprogress") {
    return (
      <Badge
        variant="outline"
        className="bg-orange-200 font-medium py-1 text-orange-700"
      >
        {status}
      </Badge>
    );
  } else if (statusLower === "active") {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-300 font-medium py-1 text-yellow-700"
      >
        {status}
      </Badge>
    );
  } else if (statusLower === "pending") {
    return (
      <Badge
        variant="outline"
        className="bg-red-300 font-medium py-1 text-red-700"
      >
        {status}
      </Badge>
    );
  } else {
    return <Badge variant="outline">{status}</Badge>;
  }
};

export default VacCard;
