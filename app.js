import express from 'express';
import middlewares from './middlewares';
import routes from './components';
import errorHandlers from './middlewares/errors.handlers';
import { middlewareLoader, routesLoader } from './utils';


const router = express();

process.on('uncaughtException', (error) => {
  console.log(error);
});
process.on('unhandledRejection', (error) => {
  console.log(error);
});

middlewareLoader(middlewares, router);
routesLoader(routes, router);
middlewareLoader(errorHandlers, router);


export default router;
