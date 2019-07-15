import db from '../../database';

/** 
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
const Booking = {
  create: async (
    user_id, trip_id, bus_id,
    trip_date, seat_number,
    first_name, last_name, email
  ) => {
    const query = `INSERT INTO bookings(
      user_id, trip_id, bus_id, trip_date,
      seat_number, first_name, last_name, email
      )
      values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
        
    const { rows } = await db.query(query, [
      user_id, trip_id, bus_id,
      trip_date, seat_number,
      first_name, last_name, email 
    ]);
    return rows;
  },
  
  getAllBookings: async () => {
    const query = 'SELECT * FROM bookings';
    const { rows } = await db.query(query);
    return rows;
  },

  getBooking: async (column, value) => {
    const query = `SELECT * FROM bookings 
    WHERE ${column} = $1`;
    const { rows } = await db.query(query, [value]);
    return rows;
  },

  updateBooking: async (
    updateColum, updateValue, searchColumn, searchValue
  ) => {
    const query = `UPDATE bookings 
    SET ${updateColum} = $1 
    WHERE ${searchColumn} = $2 
    RETURNING *`;
    const { rows } = await db.query(query, [updateValue, searchValue]);
    return rows;
  },

  deleteBooking: async (booking_id) => {
    const query = 'DELETE FROM bookings WHERE id = $1 RETURNING id';
   
    const result = await db.query(query, [booking_id]);
    return result;
  }
};

export default Booking;
