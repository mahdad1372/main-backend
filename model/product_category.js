const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Features = require("./features");
const Option = require("./option");
const Product = require("./product");

class Product_category extends Model {}

Product_category.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    icon: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_in_first_page: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    is_it_child: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "product_category",
  }
);
Product_category.hasMany(Product, {
  foreignKey: {
    name: "frk_category",
    type: DataTypes.BIGINT,
  },
});

Product.belongsTo(Product_category, {
  foreignKey: {
    name: "frk_category",
    type: DataTypes.BIGINT,
  },
});
// Option.belongsTo(Features, {
//   foreignKey: {
//     name: "frk_feature_id",
//     type: DataTypes.BIGINT,
//   },
// });
module.exports = Product_category;
