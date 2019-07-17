export const goodPropertyDetail = {
    status: 'available',
    price: 5000000,
    state: 'lagos state',
    city: 'lagos',
    address: '8 ikoku road',
    image_url: 'apart.jpg',
    type: '1 bedroom'
  };
         

export const badPropertyDetail = {
    status :'',
    propType:'',
    state:'lagos state',
    city:'lagos',
    address:'',
    price: 200000,
    image_url:''
  };


export const updatePropertyDetail = {
    type:'2 bedroom',
    state:'lagos state',
    city:'lagos',
    address:'4 ikorudu road',
    price: 200000,
    image_url:'apart.jpg',
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