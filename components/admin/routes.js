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
    path: '/api/v1/bus',
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
    path: '/api/v1/trip',
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
    path: '/api/v1/trips/:tripId',
    handlers: [
      passToken,
      checkIfAdmin,
      tripIdValidation,
      updateTrip
    ],
    method: 'patch',
  }
];
