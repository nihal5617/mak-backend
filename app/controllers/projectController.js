import formatFileDataProject from "../helpers/formatFileDataProject.js";
import { FaqModel, ImageModel, ProjectModel } from "../../server.js";
import { Op } from "sequelize";

const projectController = () => {
  return {
    async excelUpload(req, res) {
      const filename = req.filename;
      const { sheetName } = req.body;
      console.log(req.filename, sheetName);
      try {
        const data = await formatFileDataProject(filename, sheetName);
        data.map(async (item) => {
          await ProjectModel.create({
            project_name: item.project_name,
            name_on_website: item.name_on_website,
            developer_name: item.developer_name,
            location: item.location,
            total_towers: item.total_towers,
            floors: item.floors,
            apts_per_floor: item.apts_per_floor,
            configuration: item.configuration,
            typology: item.typology,
            tower_wise_configuration: JSON.parse(item.tower_wise_configuration),
            carpet_area: item.carpet_area,
            rera_number: item.rera_number,
            amenities: item.amenities,
            map_location: item.map_location,
            map_streetview: item.map_streetview,
            description: item.description,
            posession_status: item.posession_status,
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

    async getAllProjects(req, res) {
      const location = req.query.location || "";
      const configuration = req.query.configuration || "";
      const developer_name = req.query.developer_name || "";
      const project_name = req.query.project_name || "";
      try {
        const projects = await ProjectModel.findAll({
          where: {
            [Op.and]: [
              { location: { [Op.substring]: location } },
              { configuration: { [Op.substring]: configuration } },
              { developer_name: { [Op.substring]: developer_name } },
              {
                [Op.or]: [
                  { project_name: { [Op.substring]: project_name } },
                  { location: { [Op.substring]: project_name } },
                  { configuration: { [Op.substring]: project_name } },
                ],
              },
            ],
          },
        });
        const thumbnailImages = await ImageModel.findAll({
          where: { type: "Gallery" },
        });
        const thumbnailImagesMap = thumbnailImages.reduce((acc, curr) => {
          acc[curr.projectId] = curr;
          return acc;
        }, {});
        projects.map((project) => {
          project.dataValues.thumbnail = thumbnailImagesMap[project.id];
        });
        res.status(200).send({ status: "Success", data: projects });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    },

    async getProject(req, res) {
      const id = req.params.id;
      try {
        const project = await ProjectModel.findOne({
          where: { id: Number(id) },
        });
        const imageAbout = await ImageModel.findAll({
          where: { projectId: Number(id), type: "Gallery" },
        });

        const imageFloorPlan = await ImageModel.findAll({
          where: { projectId: Number(id), type: "FloorPlan" },
        });

        const imageAmenities = await ImageModel.findAll({
          where: { projectId: Number(id), type: "Amenities" },
        });

        const imageGallery = await ImageModel.findAll({
          where: { projectId: Number(id), type: "Gallery" },
        });

        const builderLogo = await ImageModel.findOne({
          where: { projectId: Number(id), type: "Logo" },
        });

        const qr = await ImageModel.findOne({
          where: { projectId: Number(id), type: "QR" },
        });

        const faqs = await FaqModel.findAll({
          where: { projectId: Number(id) },
        });

        const data = {
          project,
          faqs: faqs,
          about: imageAbout,
          floorPlan: imageFloorPlan,
          amenities: imageAmenities,
          gallery: imageGallery,
          builderLogo: builderLogo.image_url,
          qr: qr.image_url,
        };
        res.status(200).send({
          status: "Success",
          data: data,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    },
  };
};

export default projectController;
