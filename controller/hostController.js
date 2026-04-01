//controller/ hostController
const Home = require('../models/home');


exports.getAddHome = (req, res, next) => {
  res.render('host/edit-home', 
    {pageTitle: 'Add Home to airbnb',
    currentPage: 'addhome',
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId; 
  const editing = req.query.editing === 'true';
  

  Home.findById(homeId).then(home=>{
    if(!home){
      console.log("home not found for editing");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId,editing,home);
    res.render('host/edit-home', 
      { home: home,
        pageTitle: 'Edit your Home',
      currentPage: 'Host-homes',
      editing: editing,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render('host/host-home-list', { 
    registeredHomes: registeredHomes, 
    pageTitle: 'Host Homes List',
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
    });
  });
}

exports.postAddHome = (req, res, next) => {
  const {houseName,price,location,rating,photoUrl,description} = req.body;

  const home = new Home({houseName,price,location,rating,photoUrl,description});

  console.log(req.body);

  home.save().then(() =>{
    console.log('home connected sucessfully');
  });

  res.redirect('/host/host-home-list');
};

exports.postEditHome = (req, res, next) => {
  const {_id,houseName,price,location,rating,photoUrl,description} = req.body;

  Home.findById(_id).then(home =>{
    home.houseName = houseName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.photoUrl = photoUrl;
    home.description = description;

    home.save().then(result => {
      console.log('Home updated',result);
    }).catch(err =>{
      console.log('Error while updating home',err);
    });
    res.redirect('/host/host-home-list');
  }).catch(err =>{
    console.log('Error while finding home for editing',err);
    res.redirect('/host/host-home-list');
  });

  
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
