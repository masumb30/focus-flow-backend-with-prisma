import { TodoService } from './todo.service.js';
/**
 * POST /api/todos - Create new task
 */
const createTodo = async (req, res) => {
    console.log('hitting createtodo with: ', req.body);
    try {
        const userId = req.user?.id;
        const { title } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access.',
            });
        }
        if (!title || typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Task title is required.',
            });
        }
        const todo = await TodoService.createTodo({ userId, title });
        return res.status(201).json({
            success: true,
            message: 'Task created successfully.',
            data: todo,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create task.',
        });
    }
};
/**
 * GET /api/todos - Get all tasks for logged in user
 */
const getUserTodos = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access.',
            });
        }
        const todos = await TodoService.getUserTodos(userId);
        return res.status(200).json({
            success: true,
            message: 'Tasks retrieved successfully.',
            data: todos,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch tasks.',
        });
    }
};
/**
 * PATCH /api/todos/:id - Toggle task status
 */
const updateTodoStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id: todoId } = req.params;
        const { status } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access.',
            });
        }
        if (!todoId || typeof todoId !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Task ID is required.',
            });
        }
        if (!status || !['pending', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Must be "pending" or "completed".',
            });
        }
        const updatedTodo = await TodoService.updateTodoStatus({
            todoId,
            userId,
            status,
        });
        return res.status(200).json({
            success: true,
            message: 'Task status updated successfully.',
            data: updatedTodo,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || 'Failed to update task status.',
        });
    }
};
export const TodoController = {
    createTodo,
    getUserTodos,
    updateTodoStatus,
};
//# sourceMappingURL=todo.controller.js.map