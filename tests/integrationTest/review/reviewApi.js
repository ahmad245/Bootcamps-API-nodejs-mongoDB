module.exports.reviewApi = ( id=null ) => {
    return {
      MAIN: "api/v1/reviews",
      GET: "/api/v1/reviews",
      GETBYID: "/api/v1/reviews/",
      POST: "/api/v1/reviews",
      PUT: "/api/v1/reviews/" ,
      DELETE: "/api/v1/reviews/",
    };
  };
  