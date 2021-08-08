const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const BlogCategory = require("./blogCategory");

class CatAndTagCategory extends Model {}

CatAndTagCategory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CatAndTagCategory",
  }
);

CatAndTagCategory.hasMany(BlogCategory, {
  foreignKey: {
    name: "frk_CatAndTagCategory",
    type: DataTypes.BIGINT,
  },
});

BlogCategory.belongsTo(CatAndTagCategory, {
  foreignKey: {
    name: "frk_CatAndTagCategory",
    type: DataTypes.BIGINT,
  },
});

module.exports = CatAndTagCategory;
