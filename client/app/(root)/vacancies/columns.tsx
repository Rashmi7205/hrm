"use client";
import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Calendar, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"


export interface JobDetails {
  salary: {
      currency: string;
      amount: string;
      per_time: string;
  };
  contact: {
      email: string;
      phone: string;
      contact_person: string;
  };
  _id: string;
  title: string;
  job_desc: string;
  location: string;
  status: string;
  dept_name: string;
  work_exp: string;
  skills_req: string[];
  employement_type: string;
  opening_date: string;
  closing_date: string;
  education: string;
  job_suitable_for: string[];
  responsibility: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const columns: ColumnDef<JobDetails>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "location",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />  
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status :string = row.getValue("status"); 
      switch(status.toLowerCase()){
        case "completed":
            return (<Badge variant="outline" className="bg-green-300 font-medium py-1">{status}</Badge>)
       case "inprogress":
            return (<Badge variant="outline" className="bg-red-300 font-medium">{status}</Badge>)
      case "active":
              return (<Badge variant="outline" className="bg-yellow-300 font-medium">{status}</Badge>)
        default:
          return (<Badge variant="outline">{status}</Badge>)
      } 
    },
  },
  {
    accessorFn:(row)=>row.createdAt,
    id:"publication",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Publication
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date:string = row.getValue("publication");
      const dateObj = new Date(date);
      const publication = dateObj.toLocaleDateString('en-In',{
        year:'numeric',
        month:"short",
        day:"numeric"
      })
      return (<div className="lowercase flex items-center gap-1">
          <Calendar size={14} className="text-slate-400"/>
          {publication}
          </div>
        );
    },
  },
  {
    accessorFn:(row)=>row.salary.amount,
    id:"salaryAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("salaryAmount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header:"Actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job._id)}
            >
              Copy Job ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Job Details</DropdownMenuItem>
            <DropdownMenuItem>View Department</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
