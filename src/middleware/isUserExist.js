import _debug from 'debug';
import { CONSTANTS } from '../utils/index.js';
import { Http } from '../exceptions/index.js';
import { HttpError } from '../exceptions/base.js';
import { userRepository } from '../repository/index.js';

const debug = _debug(CONSTANTS.SERVICE_NAME);

/**
 * handles the error asynchronously
 *
 * @async
 * @param {Function} routeHandler route controller function
 * @returns {Function} error handler function
 */
async function isUserExist(req,res, next) {
    try {
        const userDetails = await userRepository.get({
          where: {
              ulid: req.headers.user_id
          }
        });
        if(!userDetails){
          throw Http.BadRequestError("user not exists");
        }
        res.locals.user = userDetails;
        return next();
      } catch (error) {
        if (process.env.PRINT_EXCEPTIONS === 'true') {
          console.error(error);
        }
        if (error instanceof HttpError) {
          return res.status(error.status).json(error.message);
        }
        debug(error.message);
        const internalServerError = new Http.InternalServerError(error.message);
        return res.status(500).json(internalServerError.message);
      }
}

export const isUserExists = isUserExist;
