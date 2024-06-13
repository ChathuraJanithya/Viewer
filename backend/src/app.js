import express from "express";
import cors from "cors"; //cross-origin resource sharing : access control
import logger from "./utils/logger"; //UTILS
import session from "express-session";
import "dotenv/config";
import morgan from "morgan";
import { connect } from "./utils/database.connection";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || "8090";
app.use(morgan("dev"));

app.use(cors());
app.use(express.json({ limit: "20mb" }));
/* app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 * 30 },
  })
); */

import { AuthGuard } from "./api/middleware/auth-guard.js";
app.use(AuthGuard);

//TODO: to be implemented;
/* import oAuthRouter from "./api/routes/oAuthRoutes.js"; 
app.use("/oAuth", oAuthRouter); */
import userRouter from "./api/routes/userRoutes.js";
app.use("/user", userRouter);

import roleRouter from "./api/routes/roleRoutes.js";
app.use("/role", roleRouter);

import pdfRouter from "./api/routes/pdfRoutes.js";
app.use("/pdf", pdfRouter);

app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect();
});
