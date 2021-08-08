const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db/db");
const MidRoleRoute = require("./midRoleRoutes");
const Role = require("./role");

class Route extends Model {}

Route.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Route",
  }
);

Route.belongsToMany(Role, {
  through: MidRoleRoute,
  foreignKey: {
    name: "frk_Route",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_Role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Role.belongsToMany(Route, {
  through: MidRoleRoute,
  foreignKey: {
    name: "frk_Role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_Route",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Route;
