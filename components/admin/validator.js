/**
 * Function to check if the user already exists on database

 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Void} returns nothing
 */
const checkIfAdmin = async (req, res, next) => {
  const token = req.body.token 
  || req.headers.authorization 
  || req.headers['x-access-token'];

  const { is_admin } = token;
  
  if (is_admin) {
    return next();
  }
  
  return res.status(400).json({
    status: 'Error',
    error: 'Authorization Failed'
  });
};

export default checkIfAdmin;
