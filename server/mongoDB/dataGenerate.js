// const { Review } = require('./index.js');
const faker = require('faker');
const fs = require('fs')
const { AvatarGenerator } = require('random-avatar-generator');
const ObjectsToCsv = require('objects-to-csv')
const csvWriter = require('csv-write-stream')
const csv = require('fast-csv')
const generator = new AvatarGenerator();

/* Helper Functions */
const { getRand, tagGenerator } = require('../seed/helpers.js');

/* Data Seed Methods */



const addTags = () => {
  const tags = [tagGenerator()];
  return tags
};

const addReviews = (listingId) => {
  // [name, avatar, date, review, cleanliness, accuracy, comm,
  // location, check_in, value, location_id]
  let reviews = [faker.name.findName(), generator.generateRandomAvatar(),
  faker.date.between('2015-01-01', '2021-01-01'), faker.lorem.paragraph(), getRand(3, 5), getRand(1, 5),
  getRand(1, 5), getRand(3, 5), getRand(3, 5), getRand(3, 5), listingId]
  reviews = JSON.stringify(reviews)
  return reviews
};
const addLocations = () => {
  const street = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const zip = faker.address.zipCode();
  const address = `${street}, ${city}, ${state} ${zip}`;
  // [location]
  // const locations = [address];
  return address

};


var writeStream = fs.createWriteStream('./outputSmall.csv');

let seedArray = []
console.time('data')
for (let i = 0; i <= 10; i++) {
  const street = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const zip = faker.address.zipCode();
  const address = `${street}, ${city}, ${state} ${zip}`;
  let obj = {
    id: i,
    address: address
  }
  writeStream.write(JSON.stringify(obj) + '\n')
}

console.timeEnd('data')
console.log('done')

