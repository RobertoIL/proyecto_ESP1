// multerConfig.js
import multer from "multer";

const storage = multer.memoryStorage(); // Almacenamiento en memoria para ejemplos

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Límite de tamaño: 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Acepta solo archivos de imagen
    } else {
      cb(new Error("Solo se permiten archivos de imagen."));
    }
  },
});

export default upload;
