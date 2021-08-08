const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const midCategoryPosts = require("./categoryPost");
const Post = require("./post");

class Category extends Model {}

Category.init(
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
    post_type: DataTypes.BOOLEAN,
    category_type: {
      type: DataTypes.TINYINT,
    },
    // 0 baraye category,,, 1 baraye tag
  },
  {
    sequelize,
    modelName: "Category",
  }
);

Category.belongsToMany(Post, {
  through: midCategoryPosts,
});

Post.belongsToMany(Category, {
  through: midCategoryPosts,
});

// Category.hasMany(Post);

// Post.belongsTo(Category);

// Post.hasMany(Category, {
//   foreignKey: {
//     name: "post_category_id",
//     type: DataTypes.BIGINT,
//   },
// });

module.exports = Category;
