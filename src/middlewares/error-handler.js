
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const isMalformedJson = err.type === 'entity.parse.failed';

  const statusCode = isMalformedJson
    ? 400
    : err.statusCode || 500;

  let message = 'Internal Server Error';

  if (isMalformedJson) {
    message = 'Malformed JSON request body';
  } else if (statusCode !== 500) {
    message = err.message;
  }

  console.error({
    requestId: req.id,
    message: err.message,
    stack: err.stack
  });

  res.status(statusCode).json({
    success: false,
    error: {
      message
    },
    requestId: req.id
  });
}
