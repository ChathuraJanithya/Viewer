import express from "express";
import passport from "passport";
import axios from "axios";
import UserAuth from "../models/gooleAuthModel.js";
import logger from "../../utils/logger.js";
import generateToken from "../../config/generateToken.js";
import { token } from "morgan";

const authRouter = express.Router();

//authenticating user with google
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}/user/home`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

//forwards the request to google's auth server
authRouter.get("/google", async (req, res) => {
  try {
    const response = await axios.get(
      "https://accounts.google.com/o/oauth/v2/auth",
      {
        params: req.query,
      }
    );
    logger.info(response);
    res.send(response);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Could not authenticate user" });
  }
});

//register or login user to DB
authRouter.get("/login/success", async (req, res) => {
  try {
    if (req.user) {
      const userExists = await UserAuth.find({
        email: req.user._json.email,
      });
      if (userExists) {
        generateToken(res, userExists._id);
      } else {
        const newUser = new UserAuth({
          name: req.user._json.name,
          email: req.user._json.email,
          password: Date.now(), //dummy password
        });
        generateToken(res, newUser._id);
        await newUser.save();
      }
      const userData = {
        name: req.user._json.name,
        email: req.user._json.email,
        role: userExists.role,
      };
      res.status(201).json({ result: userData, token: req.session.token });
    } else {
      logger.error("User not authenticated");
      res.status(403).json({
        message: "Not Authorized",
      });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//login failed
authRouter.get("/login/failed", (req, res) => {
  res.status(401);
  throw new Error("Login Failed");
});

//logout
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      logger.error(err);
    }
    res.redirect("/");
  });
});

export default authRouter;
