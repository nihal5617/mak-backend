import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import initRoutes from "./routes/routes.js";
import { Sequelize } from "sequelize";
import Project from "./app/models/project.js";
import Image from "./app/models/image.js";
import Faq from "./app/models/faq.js";

const file = fs.readFileSync("./202501E747F340DF0381B93BA3F076EE.txt");

/* CONFIGURATIONS */
dotenv.config();

/* APP */
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "300mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));

/* ROUTES */
initRoutes(app);

/* DATABASE */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

/* MODELS */
export const ProjectModel = Project(sequelize);
export const ImageModel = Image(sequelize);
export const FaqModel = Faq(sequelize);

/* PORT */
const PORT = process.env.PORT || 3001;

/* SERVER */
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running`);
  });
  ProjectModel.hasMany(ImageModel, { as: "images" });
  ProjectModel.hasMany(FaqModel, { as: "faqs" });
  ImageModel.belongsTo(ProjectModel);
  // await sequelize.sync({ force: true }); // once uncommented then it will truncate the table
  // console.log("Database Synced...");
} catch (error) {
  console.log("Database not connected...", error);
}
