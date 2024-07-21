import { Payroll } from "@/types";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL!;
export const createPayroll = async (payrollData: Payroll) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/payroll/create/${payrollData.emp_id}`,
      {
        pay_period: payrollData.pay_period,
        pay_rate: payrollData.pay_rate,
        emp_name: payrollData.emp_name,
        emp_position: payrollData.emp_position,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const getAllPayroll = async () => {
  try {
    const { data } = await axios.post(`${apiUrl}/payroll/all`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};
