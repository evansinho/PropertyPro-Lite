import moment from 'moment';
import uuidv4 from 'uuid/v4';


const query = {
	  //USERS
	createUser: (id, email, first_name, last_name, password, phoneNumber, address, is_admin, createdOn) => ({
    text: `INSERT INTO 
    users (id, email, first_name, last_name, password, phoneNumber, address, is_admin, createdOn) 
    VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9) RETURNING *`,
    values: [uuidv4(), email, first_name, last_name, password, phoneNumber, address, is_admin, moment(new Date())]
  }),  

	findUserByEmail: email => ({
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email]
  }),

	//PROPERTY
   createProperty: (id, owner, status, state, city, address, type, image_url, createdOn) => ({
   	text:`INSERT INTO 
    property (id, owner, status, state, city, address, type, image_url, createdOn) 
    VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9) RETURNING *`,
    values: [uuidv4(), owner, status, state, city, address, type, image_url, moment(new Date())]
   }),	

   /* findPropByAddress: userid => ({
    text: `SELECT * FROM property WHERE id = $1`,
    values: [address]
  }),*/

}

export default query;
