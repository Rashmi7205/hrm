import {Router} from 'express';
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from '../controllers/emp.controllers.js';
import { upload } from '../middlewares/fileupload.middleware.js';

const empRoutes = Router();

empRoutes.route('/').post(getAllEmployees);
empRoutes.route('/new').post(createEmployee);
empRoutes.route('/update/:id',upload.single('image')).post(updateEmployee);
empRoutes.route('/:id').get(getEmployeeById);
empRoutes.route('/delete/:id').delete(deleteEmployee);


export default empRoutes;
