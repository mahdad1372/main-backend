const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    image: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    number: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    mincount: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    default: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    termdays: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "service",
  }
);

module.exports = Service;
