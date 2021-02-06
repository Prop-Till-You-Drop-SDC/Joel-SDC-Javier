const Address = require('./index.js')
const fs = require('fs')
const split = require('split')
const fastcsv = require('fast-csv')
const csvParser = require('csv-parser')

let data = {
  address: '123 3839th St'
}


fs.createReadStream('outputSmall.csv')
  .on('error', () => {
    console.error('error')
  })
  .pipe(csvParser())
  .on('data', (row) => {
    console.log(row)
    Address.insert(row, (err, success) => {
      console.log(row)
      if (err) {
        console.error(err)
      } else {
        console.log("success")
      }
    })
  })
  .on('end', () => {
    console.log("seeding complete")
  })




