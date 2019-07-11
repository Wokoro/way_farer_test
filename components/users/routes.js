import logger from '../../utils/logger';
import { 
  userInputValidations,
  checkErrors,
  checkUniqueness 
} from './validator';
import { signup } from './controller';

export default [
  {
    path: '/auth/signup',
    handlers: [
      logger,
      ...userInputValidations,
      checkErrors, 
      checkUniqueness, 
      signup
    ],
    method: 'post',
  },
  {
    path: '/auth/signin',
    handlers: [],
    method: 'post'
  },
  {
    path: '/trips',
    handlers: [],
    method: 'get'
  }
];
