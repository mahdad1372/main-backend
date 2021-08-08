const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const AppError = require("../appError/appError");

class dealerWeb_SpecialOffer extends Model {}

dealerWeb_SpecialOffer.init(
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
    hyperlink: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "dealerWeb_SpecialOffer",
  }
);

module.exports = dealerWeb_SpecialOffer;
