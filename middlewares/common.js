import compression from 'compression';
import cors from 'cors';
import parser from 'body-parser';

/**
 * Middleware to compress response to client.
 * @param {Object} router
 * @returns {Void} no return value
 */
export const compressionHandler = (router) => {
  router.use(compression());
};

/**
 * Middleware to compress response to client.
 * @param {Object} router
 * @returns {Void} no return value
 */
export const corsHandler = (router) => {
  router.use(cors({ credentials: true, origin: true }));
};

/**
 * Middleware to extract parameter(s) from request and add to the request body.
 * @param {Object} router
 * @returns {Void} no return value
 */
export const bodyParserHandler = (router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};
