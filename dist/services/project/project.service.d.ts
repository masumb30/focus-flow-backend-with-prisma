import type { CreateProjectDTO, AddTaskDTO, UpdateTaskStatusDTO } from './project.interface.js';
declare const createProject: ({ userId, name, description, type }: CreateProjectDTO) => Promise<{
    id: string;
    name: string;
    description: string | null;
    date: Date;
    type: import("../../generated/enums.js").ProjectType;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const deleteProject: (projectId: string, userId: string) => Promise<boolean>;
declare const getAllProjects: (userId: string) => Promise<{
    _count: {
        tasks: number;
    };
    createdAt: Date;
    date: Date;
    description: string | null;
    id: string;
    name: string;
    type: import("../../generated/enums.js").ProjectType;
    updatedAt: Date;
}[]>;
declare const getProjectById: (projectId: string, userId: string) => Promise<({
    tasks: ({
        subTasks: {
            id: string;
            title: string;
            date: Date;
            status: import("../../generated/enums.js").TaskStatus;
            totalTime: number;
            projectId: string;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        title: string;
        date: Date;
        status: import("../../generated/enums.js").TaskStatus;
        totalTime: number;
        projectId: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
} & {
    id: string;
    name: string;
    description: string | null;
    date: Date;
    type: import("../../generated/enums.js").ProjectType;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}) | null>;
declare const addTask: ({ projectId, title, parentId, totalTime }: AddTaskDTO) => Promise<{
    subTasks: {
        id: string;
        title: string;
        date: Date;
        status: import("../../generated/enums.js").TaskStatus;
        totalTime: number;
        projectId: string;
        parentId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
} & {
    id: string;
    title: string;
    date: Date;
    status: import("../../generated/enums.js").TaskStatus;
    totalTime: number;
    projectId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateTaskStatus: ({ taskId, status }: UpdateTaskStatusDTO) => Promise<{
    id: string;
    title: string;
    date: Date;
    status: import("../../generated/enums.js").TaskStatus;
    totalTime: number;
    projectId: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const ProjectService: {
    createProject: typeof createProject;
    deleteProject: typeof deleteProject;
    getAllProjects: typeof getAllProjects;
    getProjectById: typeof getProjectById;
    addTask: typeof addTask;
    updateTaskStatus: typeof updateTaskStatus;
};
export {};
//# sourceMappingURL=project.service.d.ts.map