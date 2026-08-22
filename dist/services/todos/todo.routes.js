import { Router } from 'express';
// Your JWT verify middleware
import { authenticateUser } from '../../middlewares/auth.middleware.js';
import { TodoController } from './todo.controller.js';
const todoRouter = Router();
todoRouter.post('/', authenticateUser, TodoController.createTodo);
todoRouter.get('/', authenticateUser, TodoController.getUserTodos);
todoRouter.patch('/:id', authenticateUser, TodoController.updateTodoStatus);
export default todoRouter;
//# sourceMappingURL=todo.routes.js.map