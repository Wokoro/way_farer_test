import logger from '../../utils/logger';
import { 
  userSignupInputValidations,
  userSigninInputValidations,
  checkErrors,
  checkUserExistence,
  checkUniqueness 
} from './validator';
import { signup, signin } from './controller';

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
    path: '/trips',
    handlers: [],
    method: 'get'
  }
];
