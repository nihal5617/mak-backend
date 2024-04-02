import { DataTypes, ENUM } from "sequelize";

const Image = (sequelize) => {
  return sequelize.define("image", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carpet_area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: ENUM(
        "Amenities",
        "FloorPlan",
        "UnitPlan",
        "Gallery",
        "Logo",
        "QR",
        "Thumbnail"
      ),
      allowNull: true,
    },
  });
};

export default Image;
