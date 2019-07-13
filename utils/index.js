import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

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
 * function to verify user token
 * @param {*} token 
 * @returns {Void} returns nothings
 */
export const verifyToken = token => jwt.verify(token, process.env.PRI_KEY);

/**
 * Fuction to verify token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Void} returns void
 */
export const passToken = async (req, res, next) => {
  const rawToken = req.headers.authorization 
  || req.headers['x-access-token'] 
  || req.body.token;
  
  const token = rawToken ? rawToken.split(' ')[1] : false;
  if (token) {
    try {
      const issureToken = verifyToken(token);
      if (issureToken) {
        req.body.token = issureToken;
        return next();
      }
    } catch (err) {
      return res.status(400).json({ status: 400, message: 'Invalid token' });
    }
  }
  return res.status(401).json({ 
    status: 401, 
    message: 'Authorization Failed' 
  });  
};

/**
 * Hashes user password
 * @param {string} password
 * @returns {string} returns encryted password
 */
export const hashPassword = password => bcrypt.hashSync(password, 10);


/**
 * A function to return all express validator errors
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Void} return nothing
 */
export const checkErrors = (req, res, next) => {
  const errors = validationResult(req);
  const errorsHolder = [];
  for (const error of errors.array()) {
    errorsHolder.push(error.msg);
  }
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'Error', errors: errorsHolder });
  }
  next();
};
