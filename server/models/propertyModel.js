import moment from 'moment';
import uuid from 'uuid';



class Property {

  constructor() {
    this.properties = [];
  }
 
  createProperty(data) {
    const newProperty = {
      id: uuid.v4(),
      owner: uuid.v4(),//user id
      status: data.status,
      price: data.price, 
      state: data.state,
      city: data.city,
      address: data.address,
      propType: data.propType,
      image_url:data.image_url,
      createdDate: moment.now()
    };
    this.properties.push(newProperty);
    return newProperty
  }
 
  findOne(id) {
    return this.properties.find(property => property.id=== id);
  }


  findAddress(address) {
    return this.properties.find(property => property.address=== address);
  }


  findAll() {
    return this.properties;
  }


  delete(id) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties.splice(index, 1);
    return {};
  }

  update(id, data) {
    const property = this.findOne(id);
    const index = this.properties.indexOf(property);
    this.properties[index].price = data['price'] || property.price;
    this.properties[index].state = data['state'] || property.state;
    this.properties[index].city = data['city'] || property.city;
    this.properties[index].address = data['address'] || property.address;
    this.properties[index].propType = data['propType'] || property.propType;
    this.properties[index].image_url = data['image_url'] || property.image_url;
    this.properties[index].status = data['status'] || property.status;
    this.properties[index].createdDate = moment.now();
    return this.properties[index];
  }

};


module.exports = new Property();


