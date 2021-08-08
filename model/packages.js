const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Features = require("./features");
const Option = require("./option");
const Post = require("./post");

class Packages extends Model {}

Packages.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    package_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    enable: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    visible: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    default: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    order: {
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
    modelName: "packages",
  }
);
Packages.hasMany(Features, {
  foreignKey: {
    name: "frk_package_id",
    type: DataTypes.BIGINT,
  },
});

Features.belongsTo(Packages, {
  foreignKey: {
    name: "frk_package_id",
    type: DataTypes.BIGINT,
  },
});
Option.belongsTo(Features, {
  foreignKey: {
    name: "frk_feature_id",
    type: DataTypes.BIGINT,
  },
});
module.exports = Packages;
