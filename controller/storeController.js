// controller/storeController.js
const Home = require('../models/home');
const Favourite =require("../models/favourite");


exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render('store/index', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'airbnb Home'
    });
  })
}

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render('store/home-list', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'Homes List'
    });
  });
}

exports.getBookings = (req, res, next) => {
    res.render('store/bookings', {  
    pageTitle: 'My Bookings',
  });
}

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render('store/favourite-list', { 
        favouriteHomes: favouriteHomes, 
        pageTitle: 'My Favourites'
      });
    });
})
    
}

exports.postAddToFaavouirte = (req,res,next)=>{
    console.log("came to add to favourite", req.body);
    Favourite.addToFavourite(req.body.id,error=>{
      if(error){
        console.log("error while marking fav",error);
      }
      res.redirect("/favourites")
    })
    
}

exports.postRomoveFromFaavouirte = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId,error => {
    if(error){
      console.log('erroe while removing from favourite',error);
    }
    res.redirect("/favourites")
  }) 
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then(([homes])=>{
    const home = homes[0];
    if(!home){
      res.redirect("/homes");
      // console.log("home notfound");
    } else{
      console.log("Home details found", home);
      res.render('store/home-detail', { 
      home: home,
      pageTitle: 'home detail'
      });
    }

  
  });
  
}

