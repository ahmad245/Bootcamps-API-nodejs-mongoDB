module.exports.validCollection = (obj={}) => {

    return [
      {
        title: obj.title || 'course1',
          description:obj.description || "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
          weeks: obj.weeks || 8,
          tuition: obj.tuition|| 8000,
          minimumSkill: obj.minimumSkill|| "beginner",
          scholarshipsAvailable: obj.scholarshipsAvailable|| true,

          user:obj.user || undefined,
          bootcamp:obj.bootcamp || undefined,
        
        
      },
      {
        title: "course2",
        description:
          "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
        weeks: 8,
        tuition: 8000,
        minimumSkill: "beginner",
        scholarshipsAvailable: true,

        user:obj.user || undefined,
         bootcamp:obj.bootcamp || undefined,
       
      },
    ];
  };
  
  module.exports.course=(obj={})=>{
    return   {
          title: obj.title || 'course',
          description:obj.description || "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
          weeks: obj.weeks || 8,
          tuition: obj.tuition|| 8000,
          minimumSkill: obj.minimumSkill|| "beginner",
          scholarshipsAvailable: obj.scholarshipsAvailable|| true,

          // user:obj.user || undefined,
          //  bootcamp:obj.bootcamp || undefined,
        
        }
  }
  
  
  
  
  