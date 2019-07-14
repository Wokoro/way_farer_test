import logger from '../../utils/logger';
import { checkErrors, passToken } from '../../utils';
import { tripIdValidation, checkTripActiveStat } from '../trip/validator';
import checkSeatAvailability from '../booking/validation';
import { 
  userSignupInputValidations,
  userSigninInputValidations,
  checkUserExistence,
  checkUniqueness,
  passUserInfo
} from './validator';
import {
  signup, signin, getTrips, createBooking 
} from './controller';

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
  }
];
