const mongoose = require('mongoose');

const { Schema } = mongoose;

const schoolClass = new Schema({
  name: String,
  section: String,
  admin: String,
  teacher: String,
  students: [
    {
      id: String,
      name: String,
      grades: [
        {
          assignment: String,
          grade: Number,
        },
      ],
    },
  ],
  assignments: [
    {
      startDate: String,
      endDate: String,
      title: String,
      details: String,
      type: String,
    },
  ],
});

module.exports = mongoose.model('classe', schoolClass);
