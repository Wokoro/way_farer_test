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
  const { body } = res;
  const { user_id, token, is_admin } = body;
  return res.status(200).json({ 
    status: 'success', 
    data: { user_id, is_admin, token } 
  });
};
