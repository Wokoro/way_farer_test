import checkIfAdmin from './validator';
import { tripCreationValidation, tripIdValidation } from '../trip/validator';
import {
  busCreationValidation,
  checkUniqueness
} from '../bus/validator';
import { checkErrors, passToken } from '../../utils';
import { createBus, createTrip, updateTrip } from './controller';

export default [
  {
    path: '/bus',
    handlers: [
      passToken,
      checkIfAdmin,
      ...busCreationValidation, 
      checkErrors,
      checkUniqueness,
      createBus
    ],
    method: 'post',
  },
  {
    path: '/trips',
    handlers: [
      passToken,
      checkIfAdmin,
      ...tripCreationValidation, 
      checkErrors,
      createTrip
    ],
    method: 'post',
  },
  {
    path: '/trips/:trip_id',
    handlers: [
      passToken,
      checkIfAdmin,
      tripIdValidation,
      updateTrip
    ],
    method: 'patch',
  }
];
