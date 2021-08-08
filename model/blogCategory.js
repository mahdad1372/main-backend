const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const MidBlogCategoryBlog = require("./midBlogCategoryBlog");
const Blog = require("./blog");

class BlogCategory extends Model {}

BlogCategory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: DataTypes.BIGINT,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    // parent_id: DataTypes.BIGINT,
    // post_type: DataTypes.BOOLEAN,
    category_type: {
      type: DataTypes.TINYINT,
    },
    // 0 baraye category,,, 1 baraye tag
  },
  {
    sequelize,
    modelName: "BlogCategory",
  }
);

BlogCategory.belongsToMany(Blog, {
  through: MidBlogCategoryBlog,
  foreignKey: {
    name: "frk_BlogCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Blog.belongsToMany(BlogCategory, {
  through: MidBlogCategoryBlog,
  foreignKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  otherKey: {
    name: "frk_BlogCategory",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = BlogCategory;
