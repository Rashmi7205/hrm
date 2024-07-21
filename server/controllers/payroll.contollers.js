import ServerError from "../utils/server.error.js";
import Employee from '../schemas/employee.schema.js';
import Payroll from "../schemas/payroll.schema.js";

const getAllPayrolls = async (req, re, next) => {
    try {
        const payrolls = await Payroll.find({});
        return re.status(200).json(payrolls);
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const getPayrollById = async (req, re, next) => {
    try {
        const payroll = await Payroll.findById(id);
        return re.status(200).json(payroll);
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const createPayroll = async (req, res, next) => {
    try {
        const { empId } = req.params;
        if (!empId) {
            next(new ServerError("Invalid Employee Id", 400));
        }
        const { pay_period, pay_rate, emp_name, emp_position } = req.body;
        if (!pay_period || !pay_rate || !emp_name || !emp_position) {
            next(new ServerError("Invalid Data", 400));
        }
        const isEmpExist = await Employee.findById(empId);
        if (!isEmpExist) {
            next(new ServerError("Employee Not Found", 404));
        }
        const payroll = await Payroll.create({ 
            emp_id:empId,
            pay_period,
            pay_rate,
            emp_name,
            emp_position
        });
        res.status(201).json({ payroll });
    } catch (error) {  
        next(new ServerError("Internal Server Error", 501));
    }
}
const updatePayroll = async (req, res, next) => {
    try {
        const { empId } = req.params;
        if (!empId) {
            next(new ServerError("Invalid Employee Id", 400));
        }
        const { pay_period, pay_rate, emp_name, emp_position } = req.body;
        if (!pay_period || !pay_rate || !emp_name || !emp_position) {
            next(new ServerError("Invalid Data", 400));
        }
        const isEmpExist = await Employee.findById(empId);
        if (!isEmpExist) {
            next(new ServerError("Employee Not Found", 404));
        }
        const payroll = await Payroll.findByIdAndUpdate(empId, {
            pay_period, pay_rate, emp_name
        }, { new: true });
        res.status(200).json({ payroll });

    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const deletePayroll = async (req, res, next) => {
    try {
        const { empId } = req.params;
        if (!empId) {
            next(new ServerError("Invalid Employee Id", 400));
        }
        const isEmpExist = await Employee.findById(empId);
        if (!isEmpExist) {
            next(new ServerError("Employee Not Found", 404));
        }
        const payroll = await Payroll.findByIdAndDelete(empId);
        res.status(200).json({ payroll });

    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }
}
export{
    createPayroll,
    updatePayroll,
    deletePayroll,
    getPayrollById,
    getAllPayrolls
}