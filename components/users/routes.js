import { checkErrors, passToken } from '../../utils';
import { tripIdValidation, checkTripActiveStat } from '../trip/validator';
import {
  checkSeatAvailability, 
  checkBookingAvailability 
} from '../booking/validation';
import { 
  userSignupInputValidations,
  userSigninInputValidations,
  checkUserExistence,
  checkUniqueness,
  passUserInfo
} from './validator';
import {
  signup, signin, getTrips, createBooking, viewBooking, deleteBooking
} from './controller';

export default [
  {
    path: '/auth/signup',
    handlers: [
      ...userSignupInputValidations,
      checkErrors,
      checkUniqueness,
      signup
    ],
    method: 'post',
  },
  {
    path: '/auth/signin',
    handlers: [
      ...userSigninInputValidations, 
      checkErrors, 
      checkUserExistence,
      signin
    ],
    method: 'post'
  },
  {
    path: '/trips',
    handlers: [
      passToken,
      getTrips
    ],
    method: 'get'
  },
  {
    path: '/bookings',
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
    path: '/bookings',
    handlers: [
      passToken,
      passUserInfo,
      viewBooking
    ],
    method: 'get'
  },
  {
    path: '/bookings/:booking_id',
    handlers: [
      passToken,
      passUserInfo,
      checkBookingAvailability,
      deleteBooking
    ],
    method: 'delete'
  }
];
