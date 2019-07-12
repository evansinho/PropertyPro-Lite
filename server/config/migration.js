import pool from "../utilities/connection";



const migration = `

	/*Table schema for table users */
	DROP TABLE IF EXISTS users CASCADE;
	CREATE TABLE users (
	  id UUID UNIQUE PRIMARY KEY NOT NULL,
	  email VARCHAR(45) UNIQUE NOT NULL,
	  first_name TEXT NOT NULL,
	  last_name TEXT NOT NULL,
	  password varchar(100) NOT NULL,
	  phone_number NUMERIC NOT NULL,
	  address TEXT NOT NULL,
	  is_admin BOOLEAN DEFAULT FALSE,
	  /*resetPasswordToken VARCHAR(64),
	  resetPasswordExpires TIMESTAMP WITH TIMEZONE*/
	);

 
	/*Table schema for table property */
	DROP TABLE IF EXISTS property CASCADE;
	CREATE TABLE property (
	  id UUID PRIMARY KEY,
	  owner UUID REFERENCES users(id) NOT NULL,
	  price NUMERIC NOT NULL,
	  status TEXT NOT NULL,
	  state TEXT NOT NULL,
	  city TEXT NOT NULL,
	  address TEXT NOT NULL,
	  type TEXT NOT NULL,
	  image_url  TEXT NOT NULL,
	  created_on TIMESTAMP NOT NULL
	);



	/*Table schema for table flags */
	DROP TABLE IF EXISTS flags CASCADE;
	CREATE TABLE flags (
	  id UUID PRIMARY KEY NOT NULL,
	  property_id UUID NOT NULL,
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


















