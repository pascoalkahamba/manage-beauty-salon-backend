import { Request, Response, NextFunction } from "express";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { MulterError } from "multer";
import { StatusCodes } from "http-status-codes";

export const uploadFileMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Handle base64 image
    if (req.body?.photo && req.body.photo.startsWith("data:image")) {
      const base64Data = req.body.photo.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const filename = `uploads/${Date.now()}-base64-image.jpg`;

      const storageRef = ref(storage, filename);
      const metadata = {
        contentType: "image/jpeg",
      };

      const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
      const fileUrl = await getDownloadURL(snapshot.ref);

      req.fileUrl = fileUrl;
      req.fileName = filename;
      return next();
    }

    // Handle regular file upload
    const file = req.file;
    if (!file) {
      return next();
    }

    const storageRef = ref(
      storage,
      `uploads/${Date.now()}-${file.originalname}`
    );
    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );
    const fileUrl = await getDownloadURL(snapshot.ref);

    req.fileUrl = fileUrl;
    req.fileName = file.originalname;

    next();
  } catch (error) {
    if (error instanceof MulterError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Erro ao fazer upload do arquivo", error });
    }

    return res.status(500).json({ message: "Erro no servidor", error });
  }
};
