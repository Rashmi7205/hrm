"use client";
import { getAllPayroll } from "@/actions/payroll"
import { Payroll } from "@/types";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { DataTableDemo } from "@/components/Datatable";
import { payrollColumns } from "../(root)/payroll/PayrollColumns";

const PayrollTable = () => {
    const [payrollData, setPayrollData] = useState<Payroll[]>();
    const getPayrollData = async()=>{
        const payrollData = await getAllPayroll();
        setPayrollData(payrollData);
    }

    useEffect(()=>{
        getPayrollData();
    },[]);

    return (
    <section className="w-full px-3">
        {
            (payrollData && payrollData.length  > 0) ? (<>
                <DataTableDemo data={payrollData} columns={payrollColumns} searchBy="emp_name"/>
            </>)
            :(
                <Loader/>
            )
        }
    </section>
  )
}

export default PayrollTable