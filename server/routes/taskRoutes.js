import express from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createTask);
router.get("/get", verifyToken, getTasks);
router.put("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);

export default router;
