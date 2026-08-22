import type { Request, Response } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email?: string;
    };
}
/**
 * POST /api/todos - Create new task
 */
declare const createTodo: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * GET /api/todos - Get all tasks for logged in user
 */
declare const getUserTodos: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * PATCH /api/todos/:id - Toggle task status
 */
declare const updateTodoStatus: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const TodoController: {
    createTodo: typeof createTodo;
    getUserTodos: typeof getUserTodos;
    updateTodoStatus: typeof updateTodoStatus;
};
export {};
//# sourceMappingURL=todo.controller.d.ts.map