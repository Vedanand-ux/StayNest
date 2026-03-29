// controller/storeController.js
const Home = require('../models/home');
const Favourite =require("../models/favourite");


exports.getIndex = (req, res, next) => {
  console.log("session value:" , req.session);
  Home.find().then((registeredHomes) => {
    res.render('store/index', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'airbnb Home',
    isLoggedIn: req.isLoggedIn,
    });
  })
}

exports.getHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render('store/home-list', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'Homes List',
    isLoggedIn: req.isLoggedIn,
    });
  });
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', {  
    pageTitle: 'My Bookings',
    isLoggedIn: req.isLoggedIn,
  });
}

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate('houseId')
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
};

exports.postAddToFaavouirte = (req,res,next)=>{
    const homeId = req.body.id;
    Favourite.findOne({houseId:homeId}).then((fav)=>{
      if(fav){
        console.log("Already mraked as fav");
        
      } else{
        fav = new Favourite({houseId:homeId});
        fav.save().then(result =>{
          console.log("fav added",result);
        }).catch(err =>{
          console.log("error while adding fav : ",err);
        })
      }
      res.redirect("/favourites");
    })
      
};

exports.postRomoveFromFaavouirte = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete(homeId).then(result =>{
      console.log("fav removed",result);
    }).catch(err =>{
      console.log("error while removing fav : ",err);
    }).finally(()=>{
        res.redirect("/favourites")
    }); 
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(home=>{
    
    if(!home){
      res.redirect("/homes");
      // console.log("home notfound");
    } else{
      console.log("Home details found", home);
      res.render('store/home-detail', { 
      home: home,
      pageTitle: 'home detail',
      isLoggedIn: req.isLoggedIn,
      });
    }

  
  });
  
};
