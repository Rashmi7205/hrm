import { Router } from 'express';
import { authMiddleWare } from '../middlewares/auth.middleware.js';
import { createLeave, deleteLeave, getAllLeaves, getLeaveById, updateLeave } from '../controllers/leave.controller.js';

const leaveRouter = Router();

leaveRouter.get('/',getAllLeaves);
leaveRouter.post('/new',createLeave);
leaveRouter.post('/update/:id',updateLeave);
leaveRouter.delete('/delete/:id',deleteLeave);
leaveRouter.get('/:id',getLeaveById);


export default leaveRouter;