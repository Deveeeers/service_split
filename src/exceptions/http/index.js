import { BadRequestError } from './badRequest.js';
import { NotFoundError } from './notFound.js';
import { ConflictError } from './conflict.js';
import { InternalServerError } from './internalServer.js';

export const Http = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
