const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Features = require("./features");
const Attach = require("./attach");
const Product = require("./product");

class Ticket extends Model {}

Ticket.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    frk_reply: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ticket",
  }
);
Ticket.hasMany(Attach, {
  foreignKey: {
    name: "frk_ticket",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Attach.belongsTo(Ticket, {
  foreignKey: {
    name: "frk_ticket",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
// Option.belongsTo(Features, {
//   foreignKey: {
//     name: "frk_feature_id",
//     type: DataTypes.BIGINT,
//   },
// });
module.exports = Ticket;
