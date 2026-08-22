export interface CreateTodoDTO {
    userId: string;
    title: string;
}
export interface UpdateTodoStatusDTO {
    todoId: string;
    userId: string;
    status: string;
}
/**
 * Creates a new todo item associated with a user
 */
declare const createTodo: ({ userId, title }: CreateTodoDTO) => Promise<{
    id: string;
    title: string;
    status: string;
    date: Date;
    userId: string;
}>;
/**
 * Retrieves all todos for a specific user ordered by latest date
 */
declare const getUserTodos: (userId: string) => Promise<{
    id: string;
    title: string;
    status: string;
    date: Date;
    userId: string;
}[]>;
/**
 * Updates the status of a user's todo item
 */
declare const updateTodoStatus: ({ todoId, userId, status }: UpdateTodoStatusDTO) => Promise<{
    id: string;
    title: string;
    status: string;
    date: Date;
    userId: string;
}>;
export declare const TodoService: {
    createTodo: typeof createTodo;
    getUserTodos: typeof getUserTodos;
    updateTodoStatus: typeof updateTodoStatus;
};
export {};
//# sourceMappingURL=todo.service.d.ts.map