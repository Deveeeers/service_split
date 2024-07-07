import { HttpError } from '../base.js';

export class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}
