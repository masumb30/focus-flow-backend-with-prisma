
// Adjust path to your Prisma client instance
import { prisma } from '../../lib/prisma.js';
import type { CreateProjectDTO, AddTaskDTO, UpdateTaskStatusDTO } from './project.interface.js';

// 1. Create Project
const createProject = async ({ userId, name, description, type }: CreateProjectDTO) => {
  const project = await prisma.project.create({
    data: {
      userId,
      name: name.trim(),
      description: description?.trim() || null,
      ...(type && { type }),
    },
  });

  return project;
};

// 2. Delete Project
const deleteProject = async (projectId: string, userId: string) => {
  // Ensure the project exists and belongs to the user
  const existingProject = await prisma.project.findFirst({
    where: { id: projectId, userId },
  });

  if (!existingProject) {
    throw new Error('Project not found or unauthorized.');
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return true;
};

// 3. Get All Projects (Minimal Info)
const getAllProjects = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      description: true,
      date: true,
      type: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return projects;
};

// 4. Get Single Project with Task Details (including Subtasks)
const getProjectById = async (projectId: string, userId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId,
    },
    include: {
      tasks: {
        where: { parentId: null }, // Fetch root-level tasks
        include: {
          subTasks: true, // Fetch subtasks inside root tasks
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  return project;
};

// 5. Add Task to Project
const addTask = async ({ projectId, title, parentId, totalTime }: AddTaskDTO) => {
  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      projectId,
      parentId: parentId || null,
      totalTime: totalTime || 0,
    },
    include: {
      subTasks: true,
    },
  });

  return task;
};

// 6. Update Task Status
const updateTaskStatus = async ({ taskId, status }: UpdateTaskStatusDTO) => {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: { status },
  });

  return updatedTask;
};

export const ProjectService = {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  addTask,
  updateTaskStatus,
};