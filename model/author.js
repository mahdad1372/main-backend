const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Blog = require("./blog");

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_file: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Author",
  }
);

Author.hasMany(Blog, {
  foreignKey: {
    name: "author_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Blog.belongsTo(Author, {
  foreignKey: {
    name: "author_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Author;
