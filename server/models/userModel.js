import moment from 'moment';
import uuid from 'uuid';


class User {

  constructor() {
    this.users = [];
  }
 
  createUser(data) {
    const newUser = {
      id: uuid.v4(),
      first_name: data.first_name,
      last_name: data.last_name, 
      password: data.password,
      phoneNumber: data.phoneNumber,
      email: data.email,
      address: data.address,
      is_admin:data.is_admin,
      createdDate: moment.now()
    };
    this.users.push(newUser);
    return newUser
  }
 
  findOne(email) {
    return this.users.find(user => user.email=== email);
  }
}
module.exports = new User();