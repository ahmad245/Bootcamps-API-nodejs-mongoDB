module.exports.user=(obj={})=>{
    return   {
          name: obj.name || 'ahmad',
        
          email: obj.email|| "admin@gmail.com",
          role: obj.role|| "publisher",
          password: obj.password|| "123456",
          
        }
  }
  