import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../doc/swagger.json';

export default (router) => {
  router.use(
    '/swaggerdocs', 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerConfig)
  );
};
