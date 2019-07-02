import db from '../../database';
import { generateToken, hashPassword } from '../../utils';

/** Function to get a specific user from a {column} with a given {value}
 * @param {String} column
 * @param {String} value
 * @returns {Object} returns the given user details
*/


/** 
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
const User = {
  createUser: async ({ 
    email, first_name, last_name, sex, phone_number, password, address, is_admin
  }) => {
    const userToken = generateToken(email);

    const query = `INSERT INTO users( 
      email, 
      first_name, 
      last_name,
      sex, 
      phone_number, 
      password, 
      address, 
      is_admin,
      token )
      values($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING user_id, 
                is_admin, 
                first_name,
                last_name,
                phone_number,
                email,
                address,
                token`;
    
    const userPassword = hashPassword(password);
    
    const { rows } = await db.query(query, [
      email, 
      first_name,
      last_name,
      sex,
      phone_number,
      userPassword,
      address, 
      is_admin,
      userToken
    ]);
  
    return rows[0];
  },
  
  getUser: async (column, value) => {
    const query = `SELECT * FROM users WHERE ${column} = $1`;
    const { rows } = await db.query(query, [value]);
    return rows;
  }
};


export default User;
