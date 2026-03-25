const {getDB} = require("../utils/databaseUtil");
const { ObjectId } = require('mongodb');


module.exports = class Favourite {

  constructor(houseId) {
  this.houseId = houseId;
  }

  save(){
    const db = getDB();
    return db.collection('favourites').findOne({houseId: this.houseId}).then(extistingFav =>{
      if(!extistingFav){
        return db.collection('favourites').insertOne(this);
      }
      return Promise.resolve();
    })
  }

  static addToFavourite(homeId) {
    const db = getDB();
    return db.collection('favourites').insertOne(this);
  }

  static getFavourites(callback) {
    const db = getDB();
    return db.collection('favourites').find().toArray();
  }

  static deleteById(delHomeId){
    const db = getDB();
    return db.collection('favourites')
    .deleteOne({houseId: delHomeId });
  }
};


