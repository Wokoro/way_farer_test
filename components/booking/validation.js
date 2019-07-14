import Trip from '../trip/model';

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @return {Void} returns nothing
 */
const checkSeatAvailability = async (req, res, next) => {
  const { trip_id } = req.body;
  const [result] = await Trip.getTrip('id', trip_id);
  let seatNumber = req.body.seat_number;
<<<<<<< HEAD
  
  if (seatNumber) {
    seatNumber = Number(seatNumber);
    
    const { trip_date, available_seats, bus_id } = result;
    
    const seatTest = available_seats.includes(Number(seatNumber));
    
    if (seatTest) {
      req.body.trip_date = trip_date;
      req.body.available_seats = available_seats;
      req.body.bus_id = bus_id;
=======
  const { trip_date, available_seats, bus_id } = result;
  req.body.bus_id = bus_id;
  req.body.trip_date = trip_date;
  req.body.available_seats = available_seats;
  if (seatNumber) {
    seatNumber = Number(seatNumber);
        
    const seatTest = available_seats.includes(Number(seatNumber));

    if (seatTest) {
>>>>>>> ft-create-booking-167279324
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

export default checkSeatAvailability;
