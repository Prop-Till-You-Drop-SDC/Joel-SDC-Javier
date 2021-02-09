const faker = require('faker');
const fs = require('fs')
const { AvatarGenerator } = require('random-avatar-generator');
const generator = new AvatarGenerator();
const { getRand, tagGenerator } = require('../seed/helpers.js');

let stream = fs.createWriteStream(`reviews1.csv`);
let headers = 'name,avatar,date,review,cleanliness,accuracy,comm,location,check_in,value,location_id\n'
stream.write(headers, (err) => {
  if (err) console.log(err)
})

console.time('data')
try {
  for (let i = 0; i <= 2000000; i++) {
    for (let j = 0; j < 6; j++) {
      let review = `${faker.name.findName()},${generator.generateRandomAvatar()},${faker.date.between('2015-01-01', '2021-02-01')},${faker.lorem.paragraph()},${getRand(3, 5)},${getRand(1, 5)},${getRand(1, 5)},${getRand(3, 5)},${getRand(3, 5)},${getRand(3, 5)},${i}\n`
      stream.write(review)
    }
  }
} catch (error) {
  console.error(error)
}

console.timeEnd('data')
console.log('done')




