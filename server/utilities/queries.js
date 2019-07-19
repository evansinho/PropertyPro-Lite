
export const createUserQuery =  `INSERT INTO 
            users (email, first_name, last_name, password, phone_number, address) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

export const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';     

export const createPropQuery = `INSERT INTO 
            property ( owner,price, status, state, city, address, type, image_url,owner_email,owner_phone_number, created_on) 
            VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9,$10, $11) RETURNING *`       



export const deleteQuery = `DELETE FROM property WHERE id=$1 AND owner = $2 returning *`;

export const idCheckQuery = `SELECT * FROM property WHERE id=$1 AND owner = $2`;

export const updateQuery =`UPDATE property
                  SET price=$1,status=$2,state=$3,city=$4,address=$5,type=$6,image_url=$7,created_on=$8
                  WHERE id=$9 AND owner = $10 returning *`;

export const allPropQuery = 'SELECT * FROM property where owner = $1';  

export const flagQuery = `INSERT INTO 
            flags ( created_on, reason, description ) 
            VALUES ($1, $2, $3) RETURNING *`;                
