declare namespace Express {
  export interface Request {
    id: number;
    file?: Express.Multer.File;
    fileUrl?: string;
    fileName?: string;
  }
}
