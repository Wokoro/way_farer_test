import { check } from 'express-validator';
import Trip from './model';


/** Functoin to validate trip existence
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object} returns error message for error case
 */ 
export const tripIdValidation = async (req, res, next) => {
  const { tripId } = req.params;
  console.log('tripIdValidation : ', tripId);
  const result = await Trip.getTrip('id', Number(tripId));
  const [trip] = result;
  if (trip) {
    req.body.trip_status = trip.status;
    return next();
  }
  return res.status(400).json({ 
    status: 'Error', errors: 'Trip do not exists'
  });
};


/**
 * An array that holds all trip creation input validations
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

// /**
//  * Function to check if the bus already exists on database
//  * @param {*} param0 
//  * @param {*} res 
//  * @param {*} next 
//  * @returns {Void} returns nothing
//  */
// export const checkUniqueness = async ({ body }, res, next) => {
 
// };
