"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Payroll } from "@/types";
import Link from "next/link";
import { getFormattedTime } from "@/helpers";

export const payrollColumns: ColumnDef<Payroll>[] = [
  {
    accessorKey: "emp_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="flex items-center gap-1">
        <User className="p-1 bg-purple-300 rounded-md "/>
        {row.getValue("emp_name")}
        
        </div>,
  },
  {
    accessorKey: "emp_position",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Position
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =><div>{row.getValue("emp_position")}</div>,
  },
  {
    accessorKey: "pay_rate",
    header: "Pay Rate",
    cell: ({ row }) => <div>{row.getValue("pay_rate")}</div>,
  },
  {
    accessorKey: "pay_period",
    header: "Pay Period",
    cell: ({ row }) => <div>{row.getValue("pay_period")}</div>,
    enableSorting:true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =><span
    className="whitespace-nowrap rounded-full border px-2.5 py-0.5 text-sm bg-purple-300 text-purple-700"
  >
    {row.getValue("status")}
  </span> ,
    enableSorting:true,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const payroll = row.original;
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
              onClick={() => navigator.clipboard.writeText(payroll.emp_id)}
            >
              Copy  ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/employees/${payroll.emp_id}`}>View Details</Link>
              </DropdownMenuItem> 
            <DropdownMenuItem> <Link href={`/employees/${payroll.emp_id}`}>Update Details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
