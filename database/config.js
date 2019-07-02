import dotenv from 'dotenv';

dotenv.config();

export default {
  develop: {
    connectionString: process.env.DEV_DB_URL,
    ssl: false
  },
  test: {
    connectionString: process.env.TEST_DB_URL,
    ssl: false
  },
  production: {
    connectionString: process.env.PRO_DB_URL,
    ssl: true
  }
};
