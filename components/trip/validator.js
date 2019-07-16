import { check } from 'express-validator';
import Trip from './model';


/** Functoin to validate trip existence
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object} returns error message for error case
 */ 
export const tripIdValidation = async (req, res, next) => {
  const trip_id = req.params.trip_id || req.body.trip_id;
  if (trip_id) {
    const result = await Trip.getTrip('id', Number(trip_id));
    const [trip] = result;
    if (trip) {
      req.body.trip_status = trip.status;
      return next();
    }
  }
  
  return res.status(400).json({ 
    status: 'Error', error: 'Trip do not exists'
  });
};

/** Functoin to validate trip existence
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object} returns error message for error case
 */ 
export const checkTripActiveStat = async ({ body }, res, next) => {
  const { trip_status } = body;
  if (trip_status === 'cancelled') {
    return res.status(400).json({ 
      status: 'Error', error: 'Sorry trip is currently cancelled'
    });
  }
  return next();
};

/**
 * An array that holds all trip creation input validations
 */
export const tripCreationValidation = [
  check('bus_id', 'Trip origin must be present')
    .isNumeric()
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
    .optional()
    .isString()
    .not()
    .isEmpty()
    .escape()
    .trim()
];
 
// };
