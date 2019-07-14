import User from './model';
import Trip from '../trip/model';

/** Function to get all trips
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
export const getTrips = async (req, res) => {
  const { origin, destination } = req.query;
  if (origin) {
    const trips = await Trip.getTrip('origin', origin);
    if (trips.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: trips
      }); 
    }
    return res.status(200).json({
      status: 'success',
      message: `No trip(s) from origin ${origin}`
    });
  }
  if (destination) {
    const trips = await Trip.getTrip('destination', destination);
    if (trips.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: trips
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `No trip(s)to destination ${destination}`
    });
  }
  const trips = await Trip.getAllTrips();
  if (trips.length > 0) {
    return res.status(200).json({
      status: 'success',
      data: trips
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'No trip available'
  });
}; 


/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns a success message with user data
  */
export const signup = async (req, res) => {
  const response = await User.createUser(req.body);
  return res.status(200).json({
    status: 'success',
    data: response
  });
};

/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} return success message and user data
  */
export const signin = async (req, res) => {
  const { body } = req;
  const { user_id, token, is_admin } = body;
  return res.status(200).json({ 
    status: 'success', 
    data: { user_id, is_admin, token } 
  });
};
