import { Router } from 'express';
import authRouter from '../services/auth/auth.routes.js';
import todoRouter from '../services/todos/todo.routes.js';
import projectRouter from '../services/project/project.route.js';
const router = Router();
// Mount individual route modules under specific paths
router.use('/auth', authRouter);
router.use('/todos', todoRouter);
router.use('/projects', projectRouter); // Mount the projectRouter for project-related routes
// Future routes can easily be added here as your API grows:
// router.use('/todos', todoRouter);
export default router;
//# sourceMappingURL=index.js.map