import User from './model';

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
   * @returns {Void} null
  */
export const signup = async (req, res) => {
  const response = await User.createUser(req.body);
  return res.status(200).json({
    status: 'success',
    data: response
  });
};
