export const goodSignUpDetail = {
  first_name :'james',
  last_name:'isaac',
  email:'example10@yahoo.com',
  password:'12345678',
  phone_number:'09034657392',
  address:'8 ikoku road'
};

  export const badSignUpDetail ={
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    address: '',
    phoneNumber:''
 };

export const goodSignInDetail = {
    email: 'example10@yahoo.com',
    password: '12345678',
  };

export const badSignInDetail1 = {
    email: 'mary@gmail.com',
    password: '12345ui8',
};

  export const badSignInDetail2 ={
    email: 'example10@yahoo.com',
    password: '123456yiugyuuyug',
};

  export const badSignInDetail3 ={
    email: '',
    password: '1234567',
};





const credentials = {
  goodSignUpDetail,
  badSignUpDetail,
  goodSignInDetail,
  badSignInDetail1,
  badSignInDetail2,
  badSignInDetail3
}






module.exports = credentials