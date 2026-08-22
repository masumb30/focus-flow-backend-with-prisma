import { Router } from 'express';
// Adjust path
import { ProjectController } from './project.controller.js';
import { authenticateUser } from '../../middlewares/auth.middleware.js';
const projectRouter = Router();
// Project management routes
projectRouter.post('/', authenticateUser, ProjectController.createProject);
projectRouter.get('/', authenticateUser, ProjectController.getAllProjects);
projectRouter.get('/:id', authenticateUser, ProjectController.getProjectById);
projectRouter.delete('/:id', authenticateUser, ProjectController.deleteProject);
// Task management routes within projects
projectRouter.post('/:id/tasks', authenticateUser, ProjectController.addTaskToProject);
projectRouter.patch('/tasks/:taskId/status', authenticateUser, ProjectController.updateTaskStatus);
export default projectRouter;
//# sourceMappingURL=project.route.js.map