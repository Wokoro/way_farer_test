/**
 * @returns {Void} returns nothing
 */
export const next = () => {};


// HTTP REQUEST OBJECTS

export const req = {
  body: {
    user_id: 1,
    is_admin: true,
    token: 'djklfjfjfjkleiefkl',
    password: 'samdjkl',
    email: 'wokorosamuel@yahoo.com',
  }
};

export const busReq = {
  status: () => {},
  json: () => {},
  body: {
    id: 6,
    number_plate: '123jkldwrokf',
    manufacturer: 'samuel',
    model: 'BMW',
    year: '2019',
    capacity: 34
  }
};

export const tripCancelReq = {
  params: {
    tripId: {}
  },
  body: {
    trip_status: 'active'
  }
};

export const tripActivateReq = {
  params: {
    tripId: {}
  },
  body: {
    trip_status: 'cancelled'
  }
};

export const getAllTripReq = {
  query: {
    origin: false,
    destination: false
  }
};

export const getDestinationTripReq = {
  query: {
    origin: false,
    destination: true
  }
};

export const getOriginTripReq = {
  query: {
    origin: true,
    destination: false
  }
};

export const createBookingReq = {
  body: {
    user_id: 1,
    trip_id: 4,
    bus_id: 5,
    trip_date: '2019-02-13',
    seat_number: 4,
    first_name: 'Douye',
    last_name: 'Wokoro',
    email: 'wokorosamuel@yahoo.com',
    phone_number: '09066027359',
    available_seats: [1, 2, 3, 4, 5, 6]
  }
};

export const checkTripActiveStatReq = {
  body: {
    trip_status: 'cancelled'
  }
};

export const checkSeatAvailabilityReq = {
  body: {
    trip_id: 1,
    seat_number: 8
  }
};

export const tripIdValidationReq = {
  body: {
    trip_id: false
  },
  params: {
    tripId: false
  }
};


// HTTPS RESPONSE OBJECTS

export const res = {
  status: () => {},
  json: () => {}
};

export const signinRequestResponse = {
  status: 'success',
  data: {
    user_id: 1,
    is_admin: true,
    token: 'eyJhbGJ9.d29rb3QHlhaG9vLmNvbQ.vMTbtNToMyfCFQCV00D-DzssbaxdygtA'
  }
};

export const allTripsResponse = [
  {
    id: 1,
    bus_id: 1,
    origin: 'Bayelsa',
    destination: 'Delta',
    trip_date: '2019-02-13T08:00:00.000Z',
    fare: '20.00',
    status: 'active',
    duration: '1hour 30min',
    available_seats: [2, 3, 4]
  },
  {
    id: 2,
    bus_id: 2,
    origin: 'Bayelsa',
    destination: 'Delta',
    trip_date: '2019-02-13T08:00:00.000Z',
    fare: '20.00',
    status: 'active',
    duration: '1hour 30min',
    available_seats: [2, 3, 4, 5]
  }
];


// DATABASE RESPONSES

export const tripGetTripDBResponse = [{
  trip_date: '2019-10-23',
  available_seats: [1, 2],
  bus_id: 1
}
];

export const tripCreateDBResponse = [
  {
    id: 13,
    bus_id: 11,
    origin: 'Bayelsa',
    destination: 'Delta',
    trip_date: '2019-02-13T08:00:00.000Z',
    fare: '20.00',
    status: 'active',
    duration: '1hour 30min',
    available_seats: [2, 3, 4, 5, 6]

  }
];

export const busCreateDBResponse = [{
  id: 6,
  number_plate: '123jkldwrokf',
  manufacturer: 'samuel',
  model: 'BMW',
  year: '2019',
  capacity: 34
}];

export const signupDBResponse = {
  user_id: 1,
  last_name: 'samuel',
  first_name: 'douye',
  email: 'douye',
  token: 'djklfjfjfjkleiefkl',
  is_admin: true
};
