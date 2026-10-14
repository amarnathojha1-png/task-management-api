
import 'dotenv/config';

const port = Number(process.env.PORT || 3000);
const nodeEnv = process.env.NODE_ENV || 'development';

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be a valid port between 1 and 65535');
}

const allowedEnvironments = ['development', 'test', 'production'];

if (!allowedEnvironments.includes(nodeEnv)) {
  throw new Error(
    'NODE_ENV must be development, test, or production'
  );
}

export const env = {
  port,
  nodeEnv
};
