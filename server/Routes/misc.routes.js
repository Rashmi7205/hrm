import Router from 'express';
import { getAllEmpNames } from '../controllers/miscellaneous.controllers.js';

const miscRouter = Router();

miscRouter.get("/allempName",getAllEmpNames);

export  default miscRouter;