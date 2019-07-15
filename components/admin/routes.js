import checkIfAdmin from './validator';
import { tripCreationValidation, tripIdValidation } from '../trip/validator';
import {
  busCreationValidation,
  checkUniqueness, 
  checkBusAvailability 
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
    path: '/trip',
    handlers: [
      passToken,
      checkIfAdmin,
      ...tripCreationValidation, 
      checkErrors,
      checkBusAvailability,
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
