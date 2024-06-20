import jwt from "jsonwebtoken";

const AuthGuard = (req, res, next) => {
  const header = req.headers["authorization"];
  const token =
    req.cookies.jwt ||
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]);

  console.log("token", token);

  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/auth/google" ||
    req.path === "/auth/google/callback" ||
    req.path === "/auth/login/success"
  ) {
    return next();
  }

  //! Checking token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    console.log("user console: ", user);
    req.user = user.id;
    console.log("user id : ", req.user);

    next();
  });
};

module.exports = { AuthGuard };
