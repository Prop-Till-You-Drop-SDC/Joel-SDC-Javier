const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const addressSchema = mongoose.Schema({
  id: Number,
  address: String
})

var Address = mongoose.model('Address', addressSchema)

const reviewSchema = mongoose.Schema({
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
  location_id: Number,
});

var Review = mongoose.model('Review', reviewSchema)

module.exports = {
  Address, Review, db
};



