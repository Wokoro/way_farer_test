import { check, validationResult } from 'express-validator';
import User from './model';

/**
 * An array that holds all user input validations
 */
export const userInputValidations = [
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
    .trim()
    .escape(),

  check('sex', 'Sex can either be male or female')
    .isString()
    .optional()
    .isIn(['male', 'female'])
    .trim(),

  check('is_admin', 'Admin must be a boolean value \'true\' or \'false\'')
    .isBoolean()
    .trim()
    .exists()
];

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
    return res.status(400).send({ status: 'Error', errors: errorsHolder });
  }
  next();
};

/**
 * Function to check if the user already exists on database
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 * @returns {Void} returns nothing
 */
export const checkUniqueness = async ({ body }, res, next) => {
  const { email } = body;
  const result = await User.getUser('email', email);
  if (result.length > 0) {
    return res.status(400).send({
      status: 'Error',
      errors: 'User already exists'
    });
  }
  next();
};

export default {
  userInputValidations,
  checkErrors,
  checkUniqueness
};
