import Router from 'express';
import {createPayroll, updatePayroll, deletePayroll, getAllPayrolls } from '../controllers/payroll.contollers.js';
const payrollRouter = Router();
payrollRouter.route("/all").post(getAllPayrolls);
payrollRouter.route("/create/:empId").post(createPayroll);
payrollRouter.route("/update/:empId").post(updatePayroll);
payrollRouter.route("/delete/:empId").delete(deletePayroll);
export default payrollRouter;
