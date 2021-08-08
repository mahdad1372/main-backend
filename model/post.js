const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    total_rate: DataTypes.FLOAT,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_file: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seo_description: DataTypes.STRING,
    seo_title: DataTypes.STRING,
    seo_keyword: DataTypes.STRING,
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_alt: DataTypes.STRING,
    image_title: DataTypes.STRING,
    is_show: {
      type: DataTypes.TINYINT,
      defaultValue: "0",
    },
    post_type: DataTypes.TINYINT,
    // order: DataTypes.INTEGER, UNKNOWN
    visit_count: { type: DataTypes.INTEGER },
    publishAt: DataTypes.DATE,
    status: {
      type: DataTypes.TINYINT,
      defaultValue: "1",
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

// Post.belongsTo(User);

module.exports = Post;
