import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const authRouter = Router();

authRouter.post('/signup', asyncHandler(AuthController.signUp));
authRouter.post('/signin', asyncHandler(AuthController.signIn));

export default authRouter;