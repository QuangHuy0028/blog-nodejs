module.exports = {
  // Dont use this, it hasn't fixed

  // An mongoose Objects array
  multipleMongooseObjects: function (mongooseObjects) {
    mongooseObjects = mongooseObjects.map((obj) => {
      obj.toObject(); // toObject() has problems.
    });

    // In here func will return array of undefined objects and I don't know how to fix this.
    return mongooseObjects;
  },

  // Just one object
  singleMongooseObject: function (mongooseObject) {
    return mongooseObject ? mongooseObject.toObject() : mongooseObject;
  },
};
