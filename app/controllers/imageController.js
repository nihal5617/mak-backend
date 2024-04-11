import formatFileDataImage from "../helpers/formatFileDataImage.js";
import { ImageModel, ProjectModel } from "../../server.js";

const imageController = () => {
  return {
    async excelUpload(req, res) {
      const filename = req.file;
      const sheetName = req.body.sheetName;
      try {
        const data = await formatFileDataImage(filename, sheetName);
        data.map(async (item) => {
          const project = await ProjectModel.findOne({
            where: { project_name: item.project_name },
          });
            await ImageModel.create({
              projectId: project.id,
              project_name: item.project_name,
              image_url: item.image_url,
              carpet_area: item.carpet_area,
              description: item.description,
              type: item.type,
            });
        });
        res
          .status(204)
          .send({ status: "Success", message: "File Successfully Uploaded" });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    },
  };
};

export default imageController;
