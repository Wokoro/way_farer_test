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
