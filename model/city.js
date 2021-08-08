const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Dealership = require("./dealerShip");
var Province = require("./province");

class City extends Model {}

City.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    city: {
      type: DataTypes.CHAR(255, false),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "City",
  }
);
City.belongsTo(Province, {
  foreignKey: {
    name: "frk_province",
    allowNull: false,
  },
});
Province.hasMany(City, {
  foreignKey: {
    name: "frk_province",
    allowNull: false,
  },
});

City.hasMany(Dealership, {
  foreignKey: {
    name: "frk_business_city_id",
    allowNull: false,
  },
});

Dealership.belongsTo(City, {
  foreignKey: {
    name: "frk_business_city_id",
    allowNull: false,
  },
});

module.exports = City;
