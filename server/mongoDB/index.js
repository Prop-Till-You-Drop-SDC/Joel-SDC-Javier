const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const addressSchema = mongoose.Schema({
  id: Number,
  address: String
})

var Address = mongoose.model('Address', addressSchema)

const reviewSchema = mongoose.Schema({
  location_id: Number,
  address: String,
  reviews: [
    {
      review_id: Number,
      reviewer_name: String,
      avatar: String,
      date: Date,
      review: String,
      cleanliness: Number,
      accuracy: Number,
      comm: Number,
      location: Number,
      check_in: Number,
      value: Number,
      tags: Array,
    },
  ],
});

module.exports = Address;



