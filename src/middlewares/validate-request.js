
import { AppError } from '../utils/app-error.js';

export function validateRequest(schema, property) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      convert: true
    });

    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(', ');

      return next(new AppError(400, message));
    }

    req[property] = value;
    next();
  };
}
