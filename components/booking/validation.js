import Trip from '../trip/model';
import Booking from './model';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @return {Void} returns nothing
 */
export const checkSeatAvailability = async (req, res, next) => {
  const { trip_id } = req.body;
  const [result] = await Trip.getTrip('id', trip_id);
  let seatNumber = req.body.seat_number;
  const { trip_date, available_seats, bus_id } = result;
  req.body.bus_id = bus_id;
  req.body.trip_date = trip_date;
  req.body.available_seats = available_seats;
  if (seatNumber) {
    seatNumber = Number(seatNumber);
        
    const seatTest = available_seats.includes(Number(seatNumber));

    if (seatTest) {
      return next();
    }

    return res.status(400).json({
      status: 'Error',
      errors: `Seat is taken already, 
      available seats: ${result.available_seats}
      `
    });
  }
  return next();
};

/**
 * Function to check for seat availability
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns {Object} returns object
 */
export const checkBookingAvailability = async (req, res, next) => {
  const { booking_id } = req.params || req.body;
  const { user_id } = req.body;
  const result = await Booking.getBooking('id', booking_id);

  if (result.length > 0) {
    const [BookingInfo] = result;
    if (BookingInfo.user_id === user_id) {
      return next();
    }
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Booking does not exist for user'
      }
    });
  }
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Booking Does not exist'
    }
  });
};

export default checkSeatAvailability;
