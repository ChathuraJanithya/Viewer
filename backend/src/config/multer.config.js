import multer from "multer";

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../frontend/public/pdf/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed"), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
