const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class BlogFAQ extends Model {}

BlogFAQ.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ask: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "BlogFAQ",
  }
);

module.exports = BlogFAQ;
