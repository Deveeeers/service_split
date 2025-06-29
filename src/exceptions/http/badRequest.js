import { HttpError } from '../base.js';

export class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400, {
      errors: [
        {
          message,
        },
      ],
    });
    this.name = 'BadRequestError';
    // this.status = 400;
  }
}
