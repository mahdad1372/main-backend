const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const AppError = require("../appError/appError");

class dealerWeb_Testimonial extends Model {}

dealerWeb_Testimonial.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_file: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "dealerWeb_Testimonial",
  }
);

module.exports = dealerWeb_Testimonial;
