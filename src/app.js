7
import express from 'express';

import taskRoutes from './routes/task.routes.js';

import { requestId } from './middlewares/request-id.js';
import { requestLogger } from './middlewares/request-logger.js';
import { notFound } from './middlewares/not-found.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();

app.use(requestId);
app.use(requestLogger);
app.use(express.json());

app.use('/api/v1/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

