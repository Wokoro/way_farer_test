import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
/**
 * A function to load all high level middlewares
 * @param {Object} middlewares
 * @param {Object} router
 * @returns {Void} no return value
 */
export const middlewareLoader = (middlewares, router) => {
  for (const middleware of middlewares) {
    middleware(router);
  }
};

/**
 * A function to load all routes
 * @param {Object} routes
 * @param {Object} router
 * @returns {Void} null
 */
export const routesLoader = (routes, router) => {
  for (const route of routes) {
    const { path, handlers, method } = route;
    (router)[method](path, handlers);
  }
};

/**
 * Function to generate JWT
 * @param {*} payload 
 * @return {String} the jwt generated
 */
export const generateToken = payload => jwt.sign(payload, process.env.PRI_KEY);

/**
 * Hashes user password
 * @param {string} password
 * @returns {string} returns encryted password
 */
export const hashPassword = password => bcrypt.hashSync(password, 10);
