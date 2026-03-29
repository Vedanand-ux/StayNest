exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login",
    pageTitle: "Login",
    currenPage: "login",
    isLoggedIn: false
   });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  res.cookie("isLoggedIn", true);
  //req.isLOggedIn = true;
  res.redirect("/");
}
