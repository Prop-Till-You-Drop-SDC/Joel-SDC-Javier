// const { Address, db } = require('../mongoDB')
const { MongoClient } = require('mongodb');

var url = "mongodb://joel:secretPassword@18.218.234.55:27017/";



const findOne = (id, cb) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("admin");
    var query = { location_id: (id) };
    dbo.collection("reviews").find(query).toArray((err, result) => {
      if (err) throw err
      cb(result)
      db.close()
    })
  })
}

const findOneStats = (id = 2, cb) => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    var dbo = db.db("fetcher");
    var query = { id: Number(id) };
    dbo.collection("reviews2").find(query).explain("executionStats")
  })
}

findOneStats()

module.exports.findOne = findOne;