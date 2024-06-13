import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pdfSchema = new Schema(
  {
    pdfName: {
      type: String,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pdf = mongoose.model("Pdf", pdfSchema);

module.exports = Pdf;
