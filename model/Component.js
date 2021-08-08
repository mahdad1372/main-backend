const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const MidRoleComponent = require("./midRoleComponent");
const Role = require("./role");

class Component extends Model {}

Component.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    componentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    componentId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    index: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "Component",
  }
);

Component.belongsToMany(Role, {
  through: MidRoleComponent,
  foreignKey: {
    name: "frk_Component",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_Role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Role.belongsToMany(Component, {
  through: MidRoleComponent,
  foreignKey: {
    name: "frk_Role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_Component",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Component;
