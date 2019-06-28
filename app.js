import express from 'express';

const router = express();

process.on('uncaughtException', (error) => {
  console.log(error);
});
process.on('unhandledRejection', (error) => {
  console.log(error);
});

export default router;
