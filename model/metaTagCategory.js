const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category");

class MetaTagCategory extends Model {}

MetaTagCategory.init(
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
    modelName: "MetaTagCategory",
  }
);

MetaTagCategory.hasMany(Category, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.BIGINT,
  },
});

Category.belongsTo(MetaTagCategory, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.BIGINT,
  },
});

module.exports = MetaTagCategory;
