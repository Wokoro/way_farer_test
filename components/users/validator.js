import { check } from 'express-validator';
import bcrypt from 'bcrypt';
import User from './model';

/**
 * An array that holds all user signup input validations
 */
export const userSignupInputValidations = [
  check('first_name', 'Firstname must atleast be three characters')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 })
    .exists(),

  check('last_name', 'Lastname must atleast be three characters')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 })
    .exists(),

  check('email', 'Invalid email value')
    .isEmail()
    .normalizeEmail()
    .exists(),

  check(
    'password',
    'Invalid password, password must be atleast five characters'
  )
    .isString()
    .isLength({ min: 5 })
    .exists(),

  check('phone_number', 'Phone number must atleast be 11 characters')
    .isString()
    .escape()
    .optional()
    .isLength({ min: 11 }),

  check('address', 'Address should be descriptive')
    .isString()
    .optional()
    .trim()
    .escape(),

  check('sex', 'Sex can either be male or female')
    .isString()
    .optional()
    .isIn(['male', 'female'])
    .trim()
];

/**
 * An array that holds all user signup iput validations
 */
export const userSigninInputValidations = [

  check('email', 'Invalid email value')
    .isEmail()
    .normalizeEmail()
    .exists(),

  check(
    'password',
    'Invalid password, password must be atleast five characters'
  )
    .isString()
    .isLength({ min: 5 })
    .exists()
];

/**
 * Function to check if the user already exists on database
 * @param {Object} param0 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Void} returns nothing
 */
export const checkUniqueness = async ({ body }, res, next) => {
  const { email } = body;
  const result = await User.getUser('email', email);
  if (result.length > 0) {
    return res.status(400).json({
      status: 'Error',
      error: 'User already exists'
    });
  }
  next();
};

/**
 * Function to check if the user already exists on database
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Void} returns nothing
 */
export const checkUserExistence = async (req, res, next) => {
  const { body } = req;
  const { email, password: rawPassword } = body;
  const result = await User.getUser('email', email);
 
  if (result.length > 0) {
    const { password: hashPassword } = result[0];
    const userPassword = result
      ? bcrypt.compareSync(rawPassword, hashPassword)
      : false;
    if (!userPassword) {
      return res.status(400).json({
        status: 'Error',
        error: 'Wrong username or password'
      });
    }
    [req.body] = result;
    return next();
  }
  return res.status(400).json({
    status: 'Error',
    error: 'Wrong username or password'
  });
};

/**
 * Function to check if the user already exists on database
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {Void} returns nothing
 */
export const passUserInfo = async (req, res, next) => {
  const { email: user_email } = req.body.token;
  const result = await User.getUser('email', user_email);

  if (result.length > 0) {
    const {
      user_id, email, first_name, last_name, phone_number
    } = result[0];
    req.body.user_id = user_id;
    req.body.email = email;
    req.body.first_name = first_name;
    req.body.last_name = last_name;
    req.body.phone_number = phone_number;
    return next();
  }
  return res.status(400).json({
    status: 'Error',
    message: 'User do not exist, login required'
  });
};
