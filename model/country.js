const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
class Country extends Model {}

Country.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    country: {
      type: DataTypes.CHAR(255, false),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Country",
  }
);
module.exports = Country;
