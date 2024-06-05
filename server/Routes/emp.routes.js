import {Router} from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../controllers/emp.controllers.js';

const empRoutes = Router();

empRoutes.route('/').post(getAllEmployees);
empRoutes.route('/new').post(createEmployee);
empRoutes.route('/update/:id').post(updateEmployee);
empRoutes.route('/:id').get(getEmployeeById);
empRoutes.route('/delete/:id').delete(deleteEmployee);


export default empRoutes;
