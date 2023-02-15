import { fileTooBig, intervalServerError } from './messages.js';

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(400).send(fileTooBig);
    return;
  }
  res.status(500).send(intervalServerError);
}
