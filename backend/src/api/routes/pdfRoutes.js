import express from "express";
import {
  createPdf,
  getPdfs,
  getPdf,
  getUserPdfs,
} from "../controllers/pdfController.js";
import logger from "../../utils/logger.js";
import upload from "../../config/multer.config.js";

const pdfRouter = express.Router();

pdfRouter.post("/", upload.single("pdfUrl"), async (req, res) => {
  try {
    const payload = {
      ...req.body,
      pdfUrl: req.file.filename,
      uploadedBy: req.user,
    };
    createPdf(payload, res);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

pdfRouter.get("/userPdf", async (req, res) => {
  try {
    const userId = req.user;
    const payload = {
      user: req.user,
    };
    console.log(userId);
    getUserPdfs(payload, res);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

pdfRouter.get("/", getPdfs);
pdfRouter.get("/:id", getPdf);

export default pdfRouter;
