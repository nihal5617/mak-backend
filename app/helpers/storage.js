import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `assets/`);
//   },
//   filename: function (req, file, cb) {
//     req.filename = file.originalname;
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// dont store in assets folder
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
