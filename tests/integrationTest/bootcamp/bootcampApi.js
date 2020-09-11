module.exports.bootcampApi = ( id=null ) => {
  return {
    MAIN: "api/v1/bootcamps",
    GET: "/api/v1/bootcamps",
    GETBYID: "/api/v1/bootcamps/",
    POST: "/api/v1/bootcamps",
    PUT: "/api/v1/bootcamps/" ,
    DELETE: "/api/v1/bootcamps/",
  };
};
