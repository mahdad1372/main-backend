const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize("hilltest", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: {
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $eq: Op.eq,
    $ne: Op.ne,
  },
});

module.exports = sequelize;
