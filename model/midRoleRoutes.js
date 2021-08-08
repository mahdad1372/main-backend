const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db/db");

class MidRoleRoute extends Model {}

MidRoleRoute.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "MidRoleRoute",
  }
);

module.exports = MidRoleRoute;
