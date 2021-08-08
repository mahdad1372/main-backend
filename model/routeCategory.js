const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db/db");
const Route = require("./route");

class RouteCategory extends Model {}

RouteCategory.init(
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
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "RouteCategory",
  }
);

RouteCategory.hasMany(Route, {
  foreignKey: {
    name: "frk_RouteCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Route.belongsTo(RouteCategory, {
  foreignKey: {
    name: "frk_RouteCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = RouteCategory;
