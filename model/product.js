const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    is_in_first_page: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "product",
  }
);

module.exports = Product;
