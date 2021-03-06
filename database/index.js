import { Pool } from 'pg';
import faker from 'faker';
import dotenv from 'dotenv';
import config from './config';
import { generateToken, hashPassword } from '../utils';

dotenv.config();

const db = Pool({
  connectionString: config[process.env.NODE_ENV].connectionString,
  ssl: config[process.env.NODE_ENV].ssl
});


const userTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY UNIQUE,
        email VARCHAR(128) NOT NULL UNIQUE,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        sex VARCHAR(128),
        phone_number VARCHAR(128),
        password VARCHAR(128) NOT NULL,
        address VARCHAR(128),
        token VARCHAR(255) NOT NULL,
        is_admin BOOLEAN NOT NULL
    )`;

const busTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS buses(
        id SERIAL PRIMARY KEY UNIQUE,
        number_plate VARCHAR(128) NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        year VARCHAR(128) NOT NULL,
        capacity INT NOT NULL,
        available BOOL
    )`;

const 
  tripTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS trips(
        id SERIAL PRIMARY KEY UNIQUE,
        bus_id INT REFERENCES buses (id),
        origin VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        trip_date DATE NOT NULL DEFAULT CURRENT_DATE,
        fare FLOAT NOT NULL,
        status VARCHAR(128) NOT NULL,
        duration VARCHAR(128),
        available_seats INTEGER[]
    )`;

const bookingTableCreateQuery = `
    CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY UNIQUE,
        user_id INT REFERENCES users (user_id),
        trip_id INT REFERENCES trips (id),
        bus_id INT,
        trip_date DATE NOT NULL,
        first_name VARCHAR(128),
        last_name VARCHAR(128),
        email VARCHAR(128),
        seat_number INTEGER
    )`;

const queries = [
  userTableCreateQuery,
  busTableCreateQuery,
  tripTableCreateQuery,
  bookingTableCreateQuery
];

/**
 * 
 * @param {*} email 
 * @param {*} first_name 
 * @param {*} last_name 
 * @param {*} sex 
 * @param {*} phone_number 
 * @param {*} password 
 * @param {*} address 
 * @returns {Void} return nothing
 * 
 */
const createAdmin = async (
  email, first_name, last_name, sex, phone_number, password, address
) => {
  const userToken = generateToken({ email, is_admin: true });

  const query = `INSERT INTO users( 
    email, 
    first_name, 
    last_name,
    sex, 
    phone_number, 
    password, 
    address, 
    is_admin,
    token )
    values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  
  const userPassword = hashPassword(password);
  
  await db.query(query, [
    email, 
    first_name,
    last_name,
    sex,
    phone_number,
    userPassword,
    address, 
    true,
    userToken
  ]);
};


/**
 * 
 * @param {String} number_plate 
 * @param {String} manufacturer 
 * @param {String} model 
 * @param {String} year 
 * @param {Number} capacity 
 * @return {Void} null
 */
const createBuses = async (number_plate, manufacturer, model,
  year, capacity
) => {
  const query = `INSERT INTO buses(
    number_plate, 
    manufacturer,
    model,
    year, 
    capacity,
    available
    )
    values($1, $2, $3, $4, $5, $6)`;
      
  await db.query(query, [
    number_plate, manufacturer, model, year, Number(capacity), true
  ]);
};

/**
 * Function to create database table
 * @param {String[]} dbQueries for creating databases
 * @returns {Void} returns null
 * 
*/
export const createTables = async () => {
  for (const query of queries) {
    await db.query(query);
  }
  createAdmin(
    'wokorosamuel@yahoo.com',
    'Douye',
    'Wokoro',
    'male',
    '09066027359',
    'samsizzy199',
    'No. 38 Arizonal street yenezue-gene, Bayelsa state'
  );
  createBuses('123 ABD', 'Honda', 'BMW', '201S', 11);
  createBuses('324 ASD', 'Honda', 'BTW', '201S', 11);
  createBuses('343 ABD', 'Honda', 'SKE', '201S', 11);
};

/**
 * Function to DROP database tables
 * @returns {Void} returns null
 * 
*/
export const dropTables = async () => {
  await db.query('DROP TABLE IF EXISTS users, bookings, trips, buses');
};


/**
 * Function to Seed database table
 * @returns {Void} returns null
 * 
*/
export const seedDb = async () => {
  for (let i = 0; i < 5; i++) {
    await db.query(`
      INSERT INTO users( 
        email, 
        firstname, 
        lastname, 
        sex, 
        phonenumber, 
        password, 
        address,
        token, 
        is_admin
      )
      VALUES(
        '${i + faker.internet.email}', 
        '${faker.name.firstName}', 
        '${faker.name.lastName}', 
        'male', 
        '09066027359', 
        'samuel', 
        '${faker.address}', 
        'djkaldfjkal;dfjakldf',
        'true'
      )
    `);
  }
};


export default db;
