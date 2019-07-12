import db from '../../database';

/** 
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
const Bus = {
  create: async ({ body }) => {
    const {
      number_plate, manufacturer, model, year, capacity 
    } = body;
    const query = `INSERT INTO buses(
      number_plate, 
      manufacturer,
      model,
      year, 
      capacity
      )
      values($1, $2, $3, $4, $5) RETURNING *`;
        
    const { rows } = await db.query(query, [number_plate, manufacturer, model, year, Number(capacity)]);
  
    return rows;
  },
  
  getBus: async (column, value) => {
    const query = `SELECT * FROM buses 
    WHERE ${column} = $1`;
    const { rows } = await db.query(query, [value]);
    return rows;
  }
};

export default Bus;
