const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:root@vinny.ceug97y.mongodb.net/?appName=vinny";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
  .then(client => {
    console.log(client);
    _db = client.db("airbnb");
    callback(client);
  }).catch(err => {
    console.log("error while connecting to mongodb", err);
  });
};

const getDB = () => {
  if(!_db){
    throw new Error('Mongo Not connected');
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

