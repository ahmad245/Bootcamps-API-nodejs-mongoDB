module.exports.courseApi = ( id=null ) => {
    return {
      MAIN: "api/v1/courses",
      GET: "/api/v1/courses",
      GETBYID: "/api/v1/courses/",
      POST: "/api/v1/courses",
      PUT: "/api/v1/courses/" ,
      DELETE: "/api/v1/courses/",
    };
  };
  