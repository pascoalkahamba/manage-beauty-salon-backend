import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

const isBase64Image = (data: string) => {
  const base64Regex = /^data:image\/(png|jpg|jpeg|gif);base64,/;
  return base64Regex.test(data);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB
  },
  fileFilter: (req, file, cb: FileFilterCallback) => {
    // Handle base64 images
    if (req.body?.photo && isBase64Image(req.body.photo)) {
      cb(null, true);
      return;
    }

    // Handle regular file uploads
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        "Invalid file type! Please upload an image or a document (PDF, DOC, DOCX)."
      )
    );
  },
});

export default upload;
