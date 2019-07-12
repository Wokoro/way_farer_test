import { check } from 'express-validator';
import Trip from './model';

/**
 * An array that holds all bus creation input validations
 */
export const tripCreationValidation = [
  check('number_plate', 'Trip origin must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('origin', 'Trip origin must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('destination', 'Trip destination must atleast be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('trip_date', 'Trip data must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('fare', 'Trip fare must be present')
    .isFloat()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('status', 'Trip status must be present')
    .isString()
    .isIn(['active', 'cancel'])
    .not()
    .isEmpty()
    .escape()
    .trim()
    .exists(),
  
  check('duration', 'Trip duration must be present')
    .isString()
    .not()
    .isEmpty()
    .escape()
    .trim()
    .exists()
];

/**
 * Function to check if the bus already exists on database
 * @param {*} param0 
 * @param {*} res 
 * @param {*} next 
 * @returns {Void} returns nothing
 */
export const checkUniqueness = async ({ body }, res, next) => {
  // const { number_plate } = body;
  const { number_plate } = body;
  const result = await Trip.getTrip('number_plate', number_plate);
  if (result.length > 0) {
    return res.status(400).json({
      status: 'Error',
      errors: 'Trip already exists'
    });
  }
  next();
};
