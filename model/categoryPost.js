const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./category");
const Post = require("./post");

// class CategoryPosts extends Model {}

// CategoryPosts.init(
//   {
//     postId: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: Post,
//         id: "post_id",
//       },
//     },
//     categoryId: {
//       type: DataTypes.BIGINT,
//       references: {
//         model: Category,
//         key: "parent_id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "CategoryPosts",
//   }
// );

const midCategoryPosts = sequelize.define("midCategoryPosts", {
  midCategoryOrTagPostId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  // postCategoryId: {
  //   type: DataTypes.BIGINT,
  //   references: {
  //     model: "Posts",
  //     key: "post_id",
  //   },
  // },
  // categoryPostId: {
  //   type: DataTypes.BIGINT,
  //   references: {
  //     model: "Categories",
  //     key: "parent_id",
  //   },
  // },
});

module.exports = midCategoryPosts;
