const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const midCategoryPosts = require("./categoryPost");
const Post = require("./post");

class Option extends Model {}

Option.init(
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
    mincount: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enable: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "option",
  }
);

module.exports = Option;
