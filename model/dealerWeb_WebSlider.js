const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const AppError = require("../appError/appError");

class dealerWeb_WebSlider extends Model {}

dealerWeb_WebSlider.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    image_file: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    text1: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    text2: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    text3: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    priority: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "dealerWeb_WebSlider",
  }
);

module.exports = dealerWeb_WebSlider;
