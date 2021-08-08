const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Attach extends Model {}

Attach.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
    },
    attachfile: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "attach",
  }
);

module.exports = Attach;
