import { Task } from "../models/taskModel.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            status,
            createdBy: req.userId,
        });

        return res.status(200).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        console.log("Create Task Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// GET ALL TASKS FOR LOGGED-IN ADMIN
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.log("Get Tasks Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: id, createdBy: req.userId },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        console.log("Update Task Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOneAndDelete({
            _id: id,
            createdBy: req.userId,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.log("Delete Task Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
