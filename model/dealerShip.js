const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const dealerWeb_SpecialOffer = require("./dealerWeb_SpecialOffer");
const dealerWeb_Testimonial = require("./dealerWeb_Testimonial");
const dealerWeb_WebSlider = require("./dealerWeb_WebSlider");
const User = require("./user");
const Ticket = require("./ticket");
class Dealership extends Model {}

Dealership.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    bussiness_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dealership_licence_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_fax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailing_street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mailing_postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      // 1 pending, 2 accept, 3 reject
    },
    frk_dealer_owner_user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    reject_message_SMS: DataTypes.TEXT,
    reject_message_email: DataTypes.TEXT,
    accept_message_SMS: DataTypes.TEXT,
    accept_message_email: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Dealership",
    paranoid: true,
  }
);

Dealership.hasMany(User, {
  foreignKey: {
    name: "frk_dealer_ship_id",
    type: DataTypes.BIGINT,
  },
});

User.belongsTo(Dealership, {
  foreignKey: {
    name: "frk_dealer_ship_id",
    type: DataTypes.BIGINT,
  },
});

Dealership.hasMany(dealerWeb_SpecialOffer, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
Dealership.hasMany(dealerWeb_Testimonial, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
Dealership.hasMany(dealerWeb_WebSlider, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

dealerWeb_SpecialOffer.belongsTo(Dealership, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

dealerWeb_Testimonial.belongsTo(Dealership, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

dealerWeb_WebSlider.belongsTo(Dealership, {
  foreignKey: {
    name: "frk_dealership_id",
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});
// Mahdad created
// Dealership.hasMany(Ticket, {
//   foreignKey: {
//     name: "frk_dealership",
//     type: DataTypes.BIGINT,
//   },
// });

// Ticket.belongsTo(Dealership, {
//   foreignKey: {
//     name: "frk_dealership",
//     type: DataTypes.BIGINT,
//   },
// });
module.exports = Dealership;
