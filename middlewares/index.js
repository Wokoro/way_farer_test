import { bodyParserHandler, compressionHandler, corsHandler } from './common';
import swaggerHandler from './documentation';

export default [
  bodyParserHandler, 
  compressionHandler, 
  corsHandler, 
  swaggerHandler
];
