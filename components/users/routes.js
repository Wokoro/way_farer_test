import logger from '../../utils/logger';
import { checkErrors, passToken } from '../../utils';
import { 
  userSignupInputValidations,
  userSigninInputValidations,
  checkUserExistence,
  checkUniqueness 
} from './validator';
import { signup, signin, getTrips } from './controller';

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
  }
];
