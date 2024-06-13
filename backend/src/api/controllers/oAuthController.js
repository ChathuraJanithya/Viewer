/* import passport from "passport";
import jwt from "jsonwebtoken";

export const googleAuth = passport.authenticate("google", {
  scope: ["openid", "email", "profile"],
});

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: "User" },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      // Send the token as a cookie or in the response
      res.cookie("jwt", token, { httpOnly: true });
      return res.redirect("/home");
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  res.clearCookie("jwt");
  res.redirect("/");
};
 */
