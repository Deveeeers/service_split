import _debug from 'debug';
import { CONSTANTS } from '../utils/index.js';
import { Http } from '../exceptions/index.js';

const debug = _debug(CONSTANTS.SERVICE_NAME);

/**
 * validates request body
 *
 * @param {*} validationSchema schema to validate with
 * @returns {*} pass call to the next function or return 400 eror
 */
export function requestValidator(validationSchema, source = 'body') {
  return async function(req, res, next) {
    try {
      const validations = validationSchema.validate(req[source]);
      if (validations.error) {
        const errMsg = validations.error?.details?.[0]?.message;
        debug('%s', errMsg);
        const err = new Http.BadRequestError(errMsg);
        return res.status(err.status).json({
          error: {
            name: err.name,
            message: err.message,
          },
        });
      }
      req[source] = validations.value;
      return next();
    } catch (error) {
      debug('%s', error);
      const errMessage = error.msg;
      return res.status(500).json({
        error: {
          name: 'InternalServerError',
          message: errMessage,
        },
      });
    }
  };
}
