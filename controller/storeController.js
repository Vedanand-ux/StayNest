// controller/storeController.js
const Home = require('../models/home');
const Favourite =require("../models/favourite");


exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render('store/index', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'airbnb Home'
    });
  })
}

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
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
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId);
   Home.fetchAll().then((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home._id.toString()));
      res.render('store/favourite-list', { 
        favouriteHomes: favouriteHomes, 
        pageTitle: 'My Favourites'
      });
    });
})
    
}

exports.postAddToFaavouirte = (req,res,next)=>{
    const homeId = req.body.id;
    const fav = new Favourite(homeId);
    fav.save().then(result =>{
      console.log("fav added",result);
    }).catch(err =>{
      console.log("error while adding fav : ",err);
    }).finally(()=>{
        res.redirect("/favourites")
    }) 
};

exports.postRomoveFromFaavouirte = (req,res,next)=>{
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result =>{
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
      pageTitle: 'home detail'
      });
    }

  
  });
  
}

