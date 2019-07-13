export const req = {
  body: {
    user_id: 1,
    is_admin: true,
    token: 'djklfjfjfjkleiefkl',
    password: 'samdjkl',
    email: 'wokorosamuel@yahoo.com',
  }
};

/**
 * @returns {Void} returns nothing
 */
export const next = () => {};

export const res = {
  status: () => {},
  json: () => {}
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

export const signinRequestResponse = {
  status: 'success',
  data: {
    user_id: 1,
    is_admin: true,
    token: 'eyJhbGJ9.d29rb3QHlhaG9vLmNvbQ.vMTbtNToMyfCFQCV00D-DzssbaxdygtA'
  }
};
