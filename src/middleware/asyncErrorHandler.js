import _debug from 'debug';
import { CONSTANTS } from '../utils/index.js';
import { Http } from '../exceptions/index.js';
import { HttpError } from '../exceptions/base.js';

const debug = _debug(CONSTANTS.SERVICE_NAME);

/**
 * handles the error asynchronously
 *
 * @async
 * @param {Function} routeHandler route controller function
 * @returns {Function} error handler function
 */
function asyncErrorHandler(routeHandler) {
  /**
   * error handler function
   *
   * @async
   * @param {object} req express http request
   * @param {object} res express http response
   * @param {Function} next express next function
   * @param  {...any} args other arguments
   * @returns {object} passes to the next function or return api error
   */
  async function errorHandler(req, res, next, ...args) {
    try {
      return await routeHandler(req, res, next, ...args);
    } catch (error) {
      if (process.env.PRINT_EXCEPTIONS === 'true') {
        console.error(error);
      }
      if (error instanceof HttpError) {
        return res.error(error.body, error.status);
      }
      debug(error.message);
      const internalServerError = new Http.InternalServerError(error.message);
      return res.error(internalServerError.body, internalServerError.status);
    }
  }
  return errorHandler;
}

export const aeh = asyncErrorHandler;
