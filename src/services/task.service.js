
import * as taskRepository from '../repositories/task.repository.js';
import { AppError } from '../utils/app-error.js';

export function getAllTasks() {
  return taskRepository.findAll();
}

export function getTaskById(id) {
  const task = taskRepository.findById(id);

  if (!task) {
    throw new AppError(404, 'Task not found');
  }

  return task;
}

export function createTask(taskData) {
  return taskRepository.create(taskData);
}

export function updateTask(id, changes) {
  const task = taskRepository.update(id, changes);

  if (!task) {
    throw new AppError(404, 'Task not found');
  }

  return task;
}

export function deleteTask(id) {
  const deleted = taskRepository.remove(id);

  if (!deleted) {
    throw new AppError(404, 'Task not found');
  }
}
