const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class BlogComment extends Model {}

BlogComment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_approve: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "BlogComment",
  }
);

BlogComment.hasMany(BlogComment, {
  foreignKey: {
    name: "parent_id",
    type: DataTypes.BIGINT,
  },
});

module.exports = BlogComment;
