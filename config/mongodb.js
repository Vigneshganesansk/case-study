// const mongoose = require('mongoose');
// mongoose.connect(process.env.MongoURI);
// mongoose.Promise = global.Promise;
//  module.exports = mongoose.connection;

//  

//  var mongoUrl = '"mongodb+srv://admin:admin@cluster0.reyso.mongodb.net/test?retryWrites=true&w=majority"'
// var mongoose = require('mongoose')
// mongoose.connect(mongoUrl,{ useNewUrlParser: true })
// mongoose.Promise = global.Promise;
// module.exports = mongoose.connection;


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.reyso.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
module.exports = client;