const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const MidBlogCategoryBlog = sequelize.define("MidBlogCategoryBlog", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = MidBlogCategoryBlog;
