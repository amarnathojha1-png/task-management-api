
import Joi from 'joi';

const taskFields = {
  title: Joi.string().trim().min(1),
  description: Joi.string().trim(),
  status: Joi.string().valid(
    'pending',
    'in_progress',
    'completed'
  ),
  priority: Joi.string().valid(
    'low',
    'medium',
    'high'
  )
};

export const createTaskSchema = Joi.object({
  title: taskFields.title.required(),
  description: taskFields.description,
  status: taskFields.status,
  priority: taskFields.priority
}).unknown(false);

export const updateTaskSchema = Joi.object(
  taskFields
).min(1).unknown(false);

export const taskIdSchema = Joi.object({
  id: Joi.string().pattern(/^[1-9]\d*$/).required()
}).unknown(false);
