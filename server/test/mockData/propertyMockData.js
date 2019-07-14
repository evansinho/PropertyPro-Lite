export const goodPropertyDetail = {
    status: 'available',
    price: 5000000,
    state: 'lagos state',
    city: 'lagos',
    address: '8 ikoku road',
    image_url: 'https://si.wsj.net/public/resources/images/B3-DM067_RIGHTS_IM_20190319162958.jpg',
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
    propType:'2 bedroom',
    state:'lagos state',
    city:'lagos',
    address:'4 ikorudu road',
    price: 200000,
    image_url:'https://si.wsj.net/public/resources/images/B3-DM067_RIGHTS_IM_20190319162958.jpg',
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