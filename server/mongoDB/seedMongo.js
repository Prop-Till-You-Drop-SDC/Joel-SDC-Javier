const Address = require('./index.js')
const fs = require('fs')
const split = require('split')
const fastcsv = require('fast-csv')

let data = {
  address: '123 3839th St'
}


let stream = fs.createReadStream('outputSmall.csv')



Address.create(data, (err, success) => {
  if (err) {
    console.error(err)
  } else {
    console.log("success")
  }
})