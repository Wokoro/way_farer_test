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
      capacity,
      available
      )
      values($1, $2, $3, $4, $5, $6) RETURNING *`;
        
    const { rows } = await db.query(query, [
      number_plate, manufacturer, model, year, Number(capacity), true
    ]);
    return rows;
  },
  
  getBus: async (column, value) => {
    const query = `SELECT * FROM buses 
    WHERE ${column} = $1`;
    const { rows } = await db.query(query, [value]);
    return rows;
  },

  getBuses: async () => {
    const query = 'SELECT * FROM buses';
    const { rows } = await db.query(query);
    return rows;
  },
  update: async (columnToUpdate, updateValue, searchColumn, searchValue) => {
    const query = `UPDATE buses 
    SET ${columnToUpdate} = $1 
    WHERE ${searchColumn} = $2`;

    const result = await db.query(query, [updateValue, searchValue]);
    return result;
  }
};

export default Bus;
