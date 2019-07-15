import pool from "../utilities/connection";



const migration = `

	/*Table schema for table users */
	DROP TABLE IF EXISTS users CASCADE;
	CREATE TABLE users (
	  id serial UNIQUE PRIMARY KEY NOT NULL,
	  email VARCHAR(100) UNIQUE NOT NULL,
	  first_name TEXT NOT NULL,
	  last_name TEXT NOT NULL,
	  password varchar(100) NOT NULL,
	  phone_number NUMERIC NOT NULL,
	  address TEXT NOT NULL
	);

 
	/*Table schema for table property */
	DROP TABLE IF EXISTS property CASCADE;
	CREATE TABLE property (
	  id serial PRIMARY KEY,
	  owner serial REFERENCES users(id),
	  type TEXT NOT NULL,
	  price NUMERIC NOT NULL,
	  status TEXT,
	  state TEXT NOT NULL,
	  city TEXT NOT NULL,
	  address TEXT NOT NULL,
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


















