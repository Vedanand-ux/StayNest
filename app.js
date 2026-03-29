//app.js
// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH = "mongodb+srv://root:root@vinny.ceug97y.mongodb.net/?appName=vinny";

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controller/errors");

const {default: mongoose} = require("mongoose");


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new mongoDBStore({
  uri: DB_PATH,
  collection: "sessions"
});

app.use(express.urlencoded());
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.use((req,res,next) => {
  //console.log("cookie check middleware",req.get("Cookie"));
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})


app.use(authRouter);
app.use(storeRouter);
app.use("host",(req,res,next) =>{
  if(req.isLoggedIn){
    next();
  }else{
  res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;


mongoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

