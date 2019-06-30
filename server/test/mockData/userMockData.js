export const goodSignUpDetail = 
  // Good credentials
  {
  first_name :'james',
  last_name:'isaac',
  email:'james@yahoo.com',
  password:'234567h',
  phoneNumber:'09034657392'
  };

export const goodSignUpDetail2 = 
  // Email already registered(conflict) ====>[0]
  {
    first_name: 'bayo',
    last_name: 'bob',
    email: 'chucksokon@yahoo.com',
    password: '238564hh',
    phoneNumber:'07060403920'
  };

  export const badSignUpDetail =
  // Bad Request(Empty fields) ====>[1]
  {
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    address: '',
    phoneNumber:''
  };

export const goodSignInDetail = 
  {
    email: 'james@yahoo.com',
    password: '234567h',
  };

export const badSignInDetail1 = 
  // Unregistered User =====>[0]
  {
    email: 'okon@gmail.com',
    password: '12345678',
  };

  export const badSignInDetail2 =
  // Wrong Password User =====>[1]
  {
    email: 'chucksokon@yahmail.com',
    password: '123456yiugyuuyug',
  };

  export const badSignInDetail3 =
  // empty email provided =====>[2]
  {
    email: '',
    password: '1234567',
  };



const credentials = {
  goodSignUpDetail,
  goodSignUpDetail2,
  badSignUpDetail,
  goodSignInDetail,
  badSignInDetail1,
  badSignInDetail2,
  badSignInDetail3
}






module.exports = credentials