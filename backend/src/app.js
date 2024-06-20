import express from "express";
import cors from "cors"; //cross-origin resource sharing : access control
import logger from "./utils/logger"; //UTILS
import "dotenv/config";
import morgan from "morgan";
import { connect } from "./utils/database.connection";
import cookieParser from "cookie-parser";
import passportConfig from "./config/passport.js";

const app = express();
const PORT = process.env.PORT || "8090";
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
passportConfig(app);

import { AuthGuard } from "./api/middleware/auth-guard.js";
app.use(AuthGuard);

import authRouter from "./api/routes/authRoutes.js";
app.use("/auth", authRouter);

import userRouter from "./api/routes/userRoutes.js";
app.use("/user", userRouter);

import roleRouter from "./api/routes/roleRoutes.js";
app.use("/role", roleRouter);

import pdfRouter from "./api/routes/pdfRoutes.js";
import { not } from "joi";
app.use("/pdf", pdfRouter);

/* app.use(notFound);
app.use(errorHandler); */

app.listen(PORT, () => {
  logger.info(`Server is up and running on ${PORT}`);
  connect();
});
