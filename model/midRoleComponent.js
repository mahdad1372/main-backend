const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const MidRoleComponent = sequelize.define("MidRoleComponent", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = MidRoleComponent;
