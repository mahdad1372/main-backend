const { DataTypes, Model } = require("sequelize");

const sequelize = require("../db/db");
const User = require("./user");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleType: {
      type: DataTypes.ENUM("1", "2"),
      allowNull: false,
    },
    // hilzz 1, dealership 2
  },
  {
    sequelize,
    modelName: "Role",
  }
);

Role.hasMany(User, {
  foreignKey: {
    name: "frk_role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

User.belongsTo(Role, {
  foreignKey: {
    name: "frk_role",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Role;
