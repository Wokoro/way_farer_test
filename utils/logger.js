/**
 * 
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns {void} return nothing
 */
export default (req, res, next) => {
  console.log(req.body);

  next();
};
