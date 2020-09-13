

const Review = require("../../../models/Review");
const { validCollection, review } = require("./seed");
const Repository = require("../Repository");
class ReviewModel extends Repository {
  getReviewValid() {
    return review();
  }
  getInvalidReTitle() {
    return review({ title: this.prop });
  }
  getInvalidReText() {
    return review({ text: this.prop });
  }
  getInvalidReRating() {
    return review({ rating: this.prop });
  }
}

module.exports = new ReviewModel(Review, validCollection);
