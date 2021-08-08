const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Option = require("./option");
const Post = require("./post");

class Features extends Model {}

Features.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    image: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    title: {
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
  },
  {
    sequelize,
    modelName: "features",
  }
);
Features.hasMany(Option, {
  foreignKey: {
    name: "frk_feature_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Option.belongsTo(Features, {
  foreignKey: {
    name: "frk_feature_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
module.exports = Features;
