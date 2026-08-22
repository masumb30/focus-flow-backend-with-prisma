import { Router } from 'express';
import { AuthController } from './auth.controller.js';
const authRouter = Router();
authRouter.post('/signup', AuthController.signUp);
authRouter.post('/signin', AuthController.signIn);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map