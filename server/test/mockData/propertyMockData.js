export const goodPropertyDetail = 
  // Good property details
  {
    status: "available",
    price: 5009000,
    state: "lagos state",
    city: "lagos",
    address: "8 ikoku road",
    image_url:"ceiling-chairs-clean-1884235.jpg",
    propType: "6 bedroom"
  };


         

export const badPropertyDetail = 
  // bad property details
  {
  status :'',
  propType:'',
  state:'lagos state',
  city:'lagos',
  address:'',
  price: 200000,
  image_url:''
  };


export const updatePropertyDetail = 
  // update property details
  {
  propType:'2 bedroom',
  state:'lagos state',
  city:'lagos',
  address:'4 ikorudu road',
  price: 200000,
  image_url:'ceiling-chairs-clean-1884235.jpg'
  };

    
  export const markProperty = { 
    status: 'sold' 
  };


module.exports = {
	badPropertyDetail,
	updatePropertyDetail,
  markProperty,
	goodPropertyDetail
};