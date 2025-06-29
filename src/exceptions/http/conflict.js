import { HttpError } from '../base.js';

export class ConflictError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
  }
}
