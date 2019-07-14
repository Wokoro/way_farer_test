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
      number_plate, origin, destination, trip_date, fare, status, duration 
    } = body;
    const [bus] = await Bus.getBus('number_plate', number_plate);
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
    Bus.update('available', false, 'id', bus_id);
    return rows;
  },
  
  getAllTrips: async () => {
    const query = `SELECT * FROM trips`;
    const { rows } = await db.query(query);
    return rows;
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
