const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Contactus extends Model {}

Contactus.init(
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
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "contactus",
  }
);

module.exports = Contactus;
