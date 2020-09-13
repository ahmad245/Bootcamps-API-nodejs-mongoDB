

const Course = require("../../../models/Course");
const { validCollection, course } = require("./seed");
const Repository = require("../Repository");
class CourseModel extends Repository {
  getCourseValid() {
    return course();
  }
  getInvalidCrTitle() {
    return course({ title: this.prop });
  }
  getInvalidCrDescription() {
    return course({ description: this.prop });
  }
  getInvalidCrWeeks() {
    return course({ weeks: this.prop });
  }
  getInvalidCrMinimumSkill() {
    return course({ minimumSkill: this.prop });
  }
}

module.exports = new CourseModel(Course, validCollection);
