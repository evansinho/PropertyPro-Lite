import pool from "../utilities/connection";



const migration = `

	/*Table schema for table users */
	DROP TABLE IF EXISTS users CASCADE;
	CREATE TABLE users (
	  id serial UNIQUE PRIMARY KEY NOT NULL,
	  email VARCHAR(128) UNIQUE NOT NULL,
	  first_name VARCHAR(128) NOT NULL,
	  last_name VARCHAR(128),
	  password varchar(100) NOT NULL,
	  phone_number varchar(100) NOT NULL,
	  address VARCHAR(128) NOT NULL
	);

 
	/*Table schema for table property */
	DROP TABLE IF EXISTS property CASCADE;
	CREATE TABLE property (
	  id serial PRIMARY KEY,
	  owner serial REFERENCES users(id),
	  type VARCHAR(128) NOT NULL,
	  price NUMERIC NOT NULL,
	  status VARCHAR(128),
	  state VARCHAR(128) NOT NULL,
	  city VARCHAR(128) NOT NULL,
	  address VARCHAR(128) NOT NULL,
	  image_url  TEXT NOT NULL,
	  created_on TIMESTAMP NOT NULL
	);



	/*Table schema for table flags */
	DROP TABLE IF EXISTS flags CASCADE;
	CREATE TABLE flags (
	  id serial PRIMARY KEY NOT NULL,
	  property_id serial NOT NULL,
	  created_on TIMESTAMP NOT NULL,
	  reason TEXT NOT NULL,
	  description TEXT NOT NULL
	);

`;


const connect = async () => {
  try {
    const result = await pool.query(migration);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

connect();


















