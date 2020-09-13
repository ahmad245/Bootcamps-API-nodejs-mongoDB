module.exports.validCollection = (obj={}) => {

    return [
      {
        title: obj.title || 'review1',
        text:obj.text || "This course will provide",
          
          rating: obj.rating|| 8,
          user:obj.user ==null ? undefined  :obj.user,
          bootcamp:obj.bootcamp ==null ? undefined  :obj.bootcamp
        
        
      },
      {
        title: obj.title || 'review2',
        text:obj.text || "This course will provide",
          
          rating: obj.rating|| 5,
          user:obj.user ==null ? undefined  :obj.user,
          bootcamp:obj.bootcamp ==null ? undefined  :obj.bootcamp
       
      },
    ];
  };
  
  module.exports.review=(obj={})=>{
    return   {
      title: obj.title || 'review',
      text:obj.text || "This course will provide",
        rating: obj.rating|| 5,
        }
  }
  
  
  
  
  