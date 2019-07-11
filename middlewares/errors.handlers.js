import * as ErrorHelper from '../utils/error.helpers';

/**
 * 
 * @param {Object} router 
 * @return {Void} void
 */
const noMethodErrorHandler = (router) => {
  ErrorHelper.notFoundError(router);
};

/**
 * 
 * @param {Object} router 
 * @return {Void} void
 */
const clientErrorHandler = (router) => {
  ErrorHelper.clientError(router);
};

/**
 * 
 * @param {Object} router 
 * @return {Void} void
 */
const serverErrorHandler = (router) => {
  ErrorHelper.serverError(router);
};

export default [noMethodErrorHandler, clientErrorHandler, serverErrorHandler];
