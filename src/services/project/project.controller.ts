import type { Response } from 'express';
// Adjust path to your any type
import { ProjectService } from './project.service.js';
import { TaskStatus } from './project.interface.js';





// 1. Create Project
const createProject = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, description, type } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Project name is required.' });
    }

    const project = await ProjectService.createProject({ userId, name, description, type });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project.',
    });
  }
};

// 2. Delete Project
const deleteProject = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id: projectId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    await ProjectService.deleteProject(projectId, userId);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error: any) {
    return res.status(error.message.includes('not found') ? 404 : 500).json({
      success: false,
      message: error.message || 'Failed to delete project.',
    });
  }
};

// 3. Get All Projects (Minimal)
const getAllProjects = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    const projects = await ProjectService.getAllProjects(userId);

    return res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully.',
      data: projects,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch projects.',
    });
  }
};

// 4. Get Project by ID (With Tasks)
const getProjectById = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id: projectId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    const project = await ProjectService.getProjectById(projectId, userId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Project details retrieved successfully.',
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch project details.',
    });
  }
};

// 5. Add Task to Project
const addTaskToProject = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id: projectId } = req.params;
    const { title, parentId, totalTime } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Task title is required.' });
    }

    // Optional: Verify project exists & belongs to user before inserting task
    const project = await ProjectService.getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }

    const task = await ProjectService.addTask({ projectId, title, parentId, totalTime });

    return res.status(201).json({
      success: true,
      message: 'Task added to project successfully.',
      data: task,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to add task.',
    });
  }
};

// 6. Update Task Status
const updateTaskStatus = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;
    const { taskId } = req.params;
    const { status } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized access.' });
    }

    if (!status || !Object.values(TaskStatus).includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status is required.' });
    }

    const updatedTask = await ProjectService.updateTaskStatus({ taskId, status });

    return res.status(200).json({
      success: true,
      message: 'Task status updated successfully.',
      data: updatedTask,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update task status.',
    });
  }
};

export const ProjectController = {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  addTaskToProject,
  updateTaskStatus,
};