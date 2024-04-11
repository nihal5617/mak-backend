import formatFileDataFaq from "../helpers/formatFileDataFaq.js";
import { FaqModel, ProjectModel } from "../../server.js";

const faqController = () => {
  return {
    async excelUpload(req, res) {
      const filename = req.filename;
      const { sheetName } = req.body;
      console.log(req.filename, sheetName);
      try {
        const data = await formatFileDataFaq(filename, sheetName);
        data.map(async (item) => {
          const project = await ProjectModel.findOne({
            where: { project_name: item.project_name },
          });
          await FaqModel.create({
            projectId: project.id,
            project_name: item.project_name,
            question: item.question,
            answer: item.answer,
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

    async getAllFaqs(req, res) {
      const project_name = req.query.project_name || "";
      try {
        const faqs = await FaqModel.findAll({
          where: {
            project_name: { [Op.substring]: project_name },
          },
        });
        res.status(200).send(faqs);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    },
  };
};

export default faqController;