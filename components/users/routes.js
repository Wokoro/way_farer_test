import logger from '../../utils/logger';
import { checkErrors, passToken } from '../../utils';
<<<<<<< HEAD
import { tripIdValidation, checkTripActiveStat } from '../trip/validator';
import checkSeatAvailability from '../booking/validation';
=======
>>>>>>> 7e4422427e3b36724d677cbffd5f6cf0fdc474c8
import { 
  userSignupInputValidations,
  userSigninInputValidations,
  checkUserExistence,
  checkUniqueness,
  passUserInfo
} from './validator';
<<<<<<< HEAD
import {
  signup, signin, getTrips, createBooking, viewBooking
} from './controller';
=======
import { signup, signin, getTrips } from './controller';
>>>>>>> 7e4422427e3b36724d677cbffd5f6cf0fdc474c8

export default [
  {
    path: '/api/v1/auth/signup',
    handlers: [
      logger,
      ...userSignupInputValidations,
      checkErrors,
      checkUniqueness,
      signup
    ],
    method: 'post',
  },
  {
    path: '/api/v1/auth/signin',
    handlers: [
      ...userSigninInputValidations, 
      checkErrors, 
      checkUserExistence,
      signin
    ],
    method: 'post'
  },
  {
    path: '/api/v1/trips',
    handlers: [
      passToken,
      getTrips
    ],
    method: 'get'
  },
  {
    path: '/api/v1/bookings',
    handlers: [
      passToken,
      tripIdValidation,
      passUserInfo,
      checkTripActiveStat,
      checkSeatAvailability,
      createBooking
    ],
    method: 'post'
  },
  {
    path: '/api/v1/bookings',
    handlers: [
      passToken,
      passUserInfo,

      viewBooking
    ],
    method: 'get'
  }
];
