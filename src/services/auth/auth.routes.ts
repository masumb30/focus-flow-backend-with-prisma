import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const authRouter = Router();

authRouter.post('/signup', asyncHandler(AuthController.signUp));
authRouter.post('/signin', asyncHandler(AuthController.signIn));

authRouter.get('/user', asyncHandler(AuthController.verifyUserToken));

authRouter.post('/logout', asyncHandler(AuthController.logoutController));

export default authRouter;