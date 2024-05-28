import {Router} from 'express';
import { authorizeUser } from '../controllers/user.controllers.js';

const authRoutes = Router();

authRoutes.route('/').post(authorizeUser);

export default authRoutes;