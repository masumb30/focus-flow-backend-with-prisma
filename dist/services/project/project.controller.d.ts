import type { Response } from 'express';
declare const createProject: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteProject: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllProjects: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getProjectById: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const addTaskToProject: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const updateTaskStatus: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ProjectController: {
    createProject: typeof createProject;
    deleteProject: typeof deleteProject;
    getAllProjects: typeof getAllProjects;
    getProjectById: typeof getProjectById;
    addTaskToProject: typeof addTaskToProject;
    updateTaskStatus: typeof updateTaskStatus;
};
export {};
//# sourceMappingURL=project.controller.d.ts.map