module.exports.advancedResultApi = ( obj ) => {
    return {
      PAGE: `/api/v1/bootcamps?page=${obj.page}&limit=${obj.limit || 10}`,
    };
  };
  