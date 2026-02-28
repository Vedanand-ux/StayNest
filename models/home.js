
const db = require("../utils/databaseUtil");

const registeredHomes =[];

module.exports = class Home{
  constructor(id,houseName,price,location,rating,photoUrl, description){
    this.id = null;
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    
  }
 

  save(){
    return db.execute(`INSERT INTO homes (houseName,price,location,rating,imageUrl, description) VALUES(${this.houseName},${this.price},${this.location},${this.rating},${this.photoUrl},${this.description})}`);
  }

  static fetchAll(){
   return db.execute('SELECT * FROM homes');
  }

  static findById(homeId , callback){

  }

   static deleteById(homeId,callback){

   }
}; 