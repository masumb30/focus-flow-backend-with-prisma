import { prisma } from "../../lib/prisma.js";
/**
 * Creates a new todo item associated with a user
 */
const createTodo = async ({ userId, title }) => {
    const todo = await prisma.todo.create({
        data: {
            title: title.trim(),
            status: 'pending',
            userId,
        },
    });
    return todo;
};
/**
 * Retrieves all todos for a specific user ordered by latest date
 */
const getUserTodos = async (userId) => {
    const todos = await prisma.todo.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
    });
    return todos;
};
/**
 * Updates the status of a user's todo item
 */
const updateTodoStatus = async ({ todoId, userId, status }) => {
    // Ensure the todo belongs to the requested user before updating
    const existingTodo = await prisma.todo.findFirst({
        where: {
            id: todoId,
            userId,
        },
    });
    if (!existingTodo) {
        throw new Error('Task not found or access denied.');
    }
    const updatedTodo = await prisma.todo.update({
        where: { id: todoId },
        data: { status },
    });
    return updatedTodo;
};
export const TodoService = {
    createTodo,
    getUserTodos,
    updateTodoStatus,
};
//# sourceMappingURL=todo.service.js.map