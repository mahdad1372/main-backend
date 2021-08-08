const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
var Country = require("./country");
class Province extends Model {}
Province.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    province: {
      type: DataTypes.CHAR(255, false),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Province",
  }
);
Province.belongsTo(Country, {
  foreignKey: {
    name: "frk_country",
    allowNull: false,
  },
});
Country.hasMany(Province, {
  foreignKey: {
    name: "frk_country",
    allowNull: false,
  },
});
module.exports = Province;
