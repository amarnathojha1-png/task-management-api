
import { Router } from 'express';

import * as taskController from '../controllers/task.controller.js';

import { validateRequest } from '../middlewares/validate-request.js';

import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema
} from '../validators/task.validator.js';

const router = Router();

router.post(
  '/',
  validateRequest(createTaskSchema, 'body'),
  taskController.createTask
);

router.get('/', taskController.getAllTasks);

router.get(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  taskController.getTaskById
);

router.patch(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  validateRequest(updateTaskSchema, 'body'),
  taskController.updateTask
);

router.delete(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  taskController.deleteTask
);

export default router;
