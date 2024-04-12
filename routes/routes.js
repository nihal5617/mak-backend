import emailController from "../app/controllers/emailController.js";
import projectController from "../app/controllers/projectController.js";
import imageController from "../app/controllers/imageController.js";
import faqController from "../app/controllers/faqController.js";
import upload from "../app/helpers/storage.js";

const initRoutes = (app) => {
  // Test Route
  app.get("/", (req, res) => {
    res.send("Hello");
  });

  app.get("/.well-known/pki-validation/", (req, res) => {
    res.sendFile("C:/Users/Nihal gupta/Desktop/Mak Kotwal/backend/202501E747F340DF0381B93BA3F076EE.txt");
  });

  // Email Route
  app.post("/send-email", emailController().getData);

  // Excel Route
  app.post(
    "/excel-upload-project",
    upload.single("file"),
    projectController().excelUpload
  );
  app.post(
    "/excel-upload-image",
    upload.single("file"),
    imageController().excelUpload
  );
  app.post(
    "/excel-upload-faq",
    upload.single("file"),
    faqController().excelUpload
  );

  // Project Routes
  app.get("/projects", projectController().getAllProjects);
  app.get("/project/:id", projectController().getProject);
};

export default initRoutes;
