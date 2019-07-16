import { check } from 'express-validator';
import Bus from './model';

/**
 * An array that holds all bus creation input validations
 */
export const busCreationValidation = [
  check('number_plate', 'Number plate must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('manufacturer', 'Manufacturer must atleast be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('model', 'model must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('year', 'year must be present')
    .isString()
    .not().isEmpty()
    .escape()
    .trim()
    .exists(),

  check('capacity', 'capacity must be present')
    .isNumeric()
    .not().isEmpty()
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
export const checkBusAvailability = async ({ body }, res, next) => {
  const { bus_id } = body;
  const [bus] = await Bus.getBus('id', bus_id);

  if (bus) {
    return next();
  }
  return res.status(400).json({
    status: 'Error',
    error: 'bus do not exist'
  });
};


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
  const result = await Bus.getBus('number_plate', number_plate);
  if (result.length > 0) {
    return res.status(400).json({
      status: 'Error',
      error: 'Bus already exists'
    });
  }
  next();
};
