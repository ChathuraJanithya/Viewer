import Pdf from "../models/pdfModel.js";
import logger from "../../utils/logger.js";
import User from "../models/userModel.js";

// Create a new PDF
const createPdf = async (payload, res) => {
  try {
    const pdf = await Pdf.create({
      pdfName: payload.pdfName,
      pdfUrl: payload.pdfUrl,
      uploadedBy: payload.uploadedBy,
    });

    res.status(201).json({ message: "PDF created successfully", data: pdf });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all PDFs
const getPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find().populate(
      "uploadedBy",
      "name email createdAt"
    );

    res.status(200).json({ data: pdfs });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//Get pdf for by pdf id
const getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    res.status(200).json({ data: pdf });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all PDFs uploaded by a user
const getUserPdfs = async (payload, res) => {
  try {
    console.log(payload.user);
    const pdfs = await Pdf.find({ uploadedBy: payload.user });

    res.status(200).json({ data: pdfs });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createPdf, getPdfs, getPdf, getUserPdfs };
