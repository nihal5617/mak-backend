import { DataTypes } from "sequelize";

const Project = (sequelize) => {
  return sequelize.define("project", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_on_website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    developer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_towers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    floors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apts_per_floor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    configuration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typology: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tower_wise_configuration: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    carpet_area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rera_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amenities: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    map_location: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    map_streetview: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    posession_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default Project;
