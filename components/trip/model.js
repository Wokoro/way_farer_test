import db from '../../database';
import Bus from '../bus/model';

/** 
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
const Trip = {
  create: async ({ body }) => {
    const {
      bus_id: passed_Id, origin, destination, trip_date, fare, status, duration 
    } = body;
    const [bus] = await Bus.getBus('id', passed_Id);
    const { id: bus_id } = bus;
    const available_seats = [];
    const { capacity } = bus;
    for (let i = 2; i <= capacity; i++) {
      available_seats.push(i);
    }
    const query = `INSERT INTO trips(
      bus_id,
      origin, 
      destination, 
      trip_date, 
      fare, 
      status, 
      duration,
      available_seats
      )
      values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        
    const { rows } = await db.query(query, [
      bus_id, 
      `${origin.charAt(0).toUpperCase() + origin.slice(1)}`, 
      `${destination.charAt(0).toUpperCase() + destination.slice(1)}`, 
      trip_date,
      fare,
      status,
      duration, 
      available_seats
    ]);
    return rows;
  },
  
  getAllTrips: async () => {
    const query = 'SELECT * FROM trips';
    const { rows } = await db.query(query);
    return rows;
  },

  update: async (columnToUpdate, updateValue, searchColumn, searchValue) => {
    const query = `UPDATE trips 
    SET ${columnToUpdate} = $1 
    WHERE ${searchColumn} = $2
    RETURNING *`;

    const result = await db.query(query, [updateValue, searchValue]);
    return result;
  },

  getTrip: async (column, value) => {
    const query = `SELECT * FROM trips 
    WHERE ${column} = $1`;
    const { rows } = await db.query(query, [value]);
    return rows;
  },

  updateTrip: async (updateColum, updateValue, searchColumn, searchValue) => {
    const query = `UPDATE trips 
    SET ${updateColum} = $1 
    WHERE ${searchColumn} = $2 
    RETURNING *`;
    const { rows } = await db.query(query, [updateValue, searchValue]);
    return rows;
  }

};

export default Trip;
