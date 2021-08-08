const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const BlogComment = require("./blogComment");
const BlogFAQ = require("./blogFAQ");

class Blog extends Model {}

Blog.init(
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
    rater_count: DataTypes.INTEGER,
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
    order: DataTypes.INTEGER,
    visit_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    publishAt: DataTypes.DATE,
    // status: {
    //   type: DataTypes.TINYINT,
    //   defaultValue: "1",
    // },
    attach_file: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Blog",
  }
);

Blog.hasMany(BlogComment, {
  foreignKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
  },
});
BlogComment.belongsTo(Blog, {
  foreignKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
  },
});

Blog.hasMany(BlogFAQ, {
  foreignKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

BlogFAQ.belongsTo(Blog, {
  foreignKey: {
    name: "frk_Blog",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

module.exports = Blog;
