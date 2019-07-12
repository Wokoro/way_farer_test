export const req = {
  body: {
    user_id: 1,
    is_admin: true,
    token: 'djklfjfjfjkleiefkl',
    password: 'samdjkl',
    email: 'wokorosamuel@yahoo.com'
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
