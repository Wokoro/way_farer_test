import User from './model';
import Trip from '../trip/model';
import Booking from '../booking/model';

/** Function to get all trips
 * @param {Object} req
 * @param {Object} res
 * @returns {Void} null
*/
export const getTrips = async (req, res) => {
  const { origin, destination } = req.query;
  if (origin) {
    const trips = await Trip.getTrip('origin', origin);
    if (trips.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: trips
      }); 
    }
    return res.status(200).json({
      status: 'success',
      message: `No trip(s) from origin ${origin}`
    });
  }
  if (destination) {
    const trips = await Trip.getTrip('destination', destination);
    if (trips.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: trips
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `No trip(s)to destination ${destination}`
    });
  }
  const trips = await Trip.getAllTrips();
  if (trips.length > 0) {
    return res.status(200).json({
      status: 'success',
      data: trips
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'No trip available'
  });
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
  const { body } = req;
  const { user_id, token, is_admin } = body;
  return res.status(200).json({ 
    status: 'success', 
    data: { user_id, is_admin, token } 
  });
};

/** 
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} return success message and user data
  */
export const createBooking = async (req, res) => {
  const {
    user_id, email, first_name, phone_number,
    last_name, trip_id, trip_date, 
<<<<<<< HEAD
    bus_id, seat_number, available_seats 
  } = req.body;


  const seatNumber = Number(seat_number);
  
  const updatedAvailableSeats = available_seats
    .filter(value => !(value === seatNumber));

  await Trip.update('available_seats', updatedAvailableSeats, 'id', trip_id);
=======
    bus_id, seat_number = null, available_seats 
  } = req.body;

  const seatNumber = Number(seat_number);
  
  if (seatNumber) {
    const updatedAvailableSeats = available_seats
      .filter(value => !(value === seatNumber));

    await Trip.update('available_seats', updatedAvailableSeats, 'id', trip_id);
  }
>>>>>>> ft-create-booking-167279324

  const bookingResponse = await Booking.create(
    user_id,
    trip_id, 
    seatNumber
  );

  const { id: booking_id } = bookingResponse[0];

  const responseContruct = {
    booking_id,
    user_id,
    trip_id: Number(trip_id),
    bus_id,
    trip_date,
<<<<<<< HEAD
    seat_number: Number(seat_number),
=======
    seat_number,
>>>>>>> ft-create-booking-167279324
    first_name,
    last_name,
    email,
    phone_number
  };

  res.status(200).json({
    status: 'success',
    data: responseContruct
  });
};
