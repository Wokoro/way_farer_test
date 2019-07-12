import checkIfAdmin from './validator';
import { busCreationValidation, checkUniqueness } from '../bus/validator';
import { checkErrors, passToken } from '../../utils';
import { createBus } from './controller';

export default [
  {
    path: '/api/v1/bus',
    handlers: [
      passToken,
      ...busCreationValidation, 
      checkErrors,
      checkIfAdmin,
      checkUniqueness,
      createBus
    ],
    method: 'post',
  }
];
