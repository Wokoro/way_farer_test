import Trip from '../trip/model';
import Bus from '../bus/model';

/** 
 * @param {Object} res
 * @returns {Void} null
*/
export const getTrips = ({ body }, res) => {
  console.log('body', body, 'res', res);
}; 

/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns a success message with user data
  */
export const createBus = async (req, res) => {
  const [response] = await Bus.create(req);
  return res.status(200).json({
    status: 'success',
    data: response
  });
};
 
/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns a success message with user data
  */
export const createTrip = async (req, res) => {
  const [response] = await Trip.create(req);
  return res.status(200).json({
    status: 'success',
    data: response
  });
};

/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns a success message with user data
  */
export const updateTrip = async (req, res) => {
  const { tripId } = req.params;
  const tripsStatus = req.body.trip_status;
  
  const updataStatus = tripsStatus === 'cancelled' 
    ? 'active'
    : 'cancelled';
    
  const [response] = await Trip.updateTrip(
    'status', updataStatus, 'id', tripId
  );
  
  return res.status(200).json({
    status: 'success',
    data: {
      message: `Trip ${updataStatus === 'active'
        ? 'activated' 
        : 'cancelled'} succesfully`,
      trip_data: response
    }
  });
};
