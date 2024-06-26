/* const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign({ user: req.user }, process.env.SECRET_KEY || "", {
      expiresIn: "1h",
    });
    res.cookie("jwtToken", token);
    res.redirect("http://localhost:5173");
  }
);

authRouter.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = authRouter;
 */
