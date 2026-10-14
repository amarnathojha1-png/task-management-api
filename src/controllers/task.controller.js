
import * as taskService from '../services/task.service.js';

export function getAllTasks(req, res) {
  const tasks = taskService.getAllTasks();

  res.status(200).json({
    success: true,
    data: tasks
  });
}

export function getTaskById(req, res) {
  const task = taskService.getTaskById(req.params.id);

  res.status(200).json({
    success: true,
    data: task
  });
}

export function createTask(req, res) {
  const task = taskService.createTask(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
}

export function updateTask(req, res) {
  const task = taskService.updateTask(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    data: task
  });
}

export function deleteTask(req, res) {
  taskService.deleteTask(req.params.id);

  res.status(204).end();
}
