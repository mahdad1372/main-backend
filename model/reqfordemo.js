const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Reqfordemo extends Model {}

Reqfordemo.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    f_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    f_lastname: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    companyname: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    contact_method: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "reqfordemo",
  }
);

module.exports = Reqfordemo;
