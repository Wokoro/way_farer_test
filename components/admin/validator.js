/**
 * Function to check if the user already exists on database
<<<<<<< HEAD
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
=======
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
>>>>>>> 7e4422427e3b36724d677cbffd5f6cf0fdc474c8
 * @returns {Void} returns nothing
 */
const checkIfAdmin = async (req, res, next) => {
  const token = req.body.token 
  || req.headers.authorization 
  || req.headers['x-access-token'];
<<<<<<< HEAD
  
=======

>>>>>>> 7e4422427e3b36724d677cbffd5f6cf0fdc474c8
  const { is_admin } = token;
  
  if (is_admin) {
    return next();
  }
  
  return res.status(401).json({
    status: 'Error',
    errors: 'Authorization Failed'
  });
};

export default checkIfAdmin;
