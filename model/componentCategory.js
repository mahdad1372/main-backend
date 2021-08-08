const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Component = require("./Component");

class ComponentCategory extends Model {}

ComponentCategory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ComponentCategory",
  }
);

ComponentCategory.hasMany(Component, {
  foreignKey: {
    name: "frk_ComponentCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Component.belongsTo(ComponentCategory, {
  foreignKey: {
    name: "frk_ComponentCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = ComponentCategory;
