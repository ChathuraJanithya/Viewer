import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStategy } from "passport-google-oauth2";

const passportConfig = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false, //revalidate the session without using the same session id
      saveUninitialized: false, //don't save the session if nothing is stored
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      (accessToken, refreshToken, profile, callback) => {
        callback(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportConfig;
