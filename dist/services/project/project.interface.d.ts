export declare enum ProjectType {
    PERSONAL = "PERSONAL",
    TEAM = "TEAM"
}
export declare enum TaskStatus {
    IDEAL = "IDEAL",
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETE = "COMPLETE",
    PAUSED = "PAUSED"
}
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email?: string;
    };
}
export interface CreateProjectDTO {
    userId: string;
    name: string;
    description?: string;
    type?: ProjectType;
}
export interface AddTaskDTO {
    projectId: string;
    title: string;
    parentId?: string;
    totalTime?: number;
}
export interface UpdateTaskStatusDTO {
    taskId: string;
    status: TaskStatus;
}
//# sourceMappingURL=project.interface.d.ts.map