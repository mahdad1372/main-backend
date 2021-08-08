const { DataTypes, Model } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sequelize = require("../db/db");
const AppError = require("../appError/appError");
const validator = require("validator");
const Ticket = require("./ticket");
const generateRandomCode = require("../util/randomCode");

class User extends Model {
  static async findByCredentials(email, password) {
    const user = await User.findOne({ where: { email, active: 1 } });
    if (!user) throw new AppError("USER NOT FOUND", 404);
    const checkPw = await bcrypt.compare(password, user.password);
    if (!checkPw) throw new AppError("WRONG PASSWORD", 400);

    return user;
  }

  toJSON() {
    const user = { ...this.dataValues };

    delete user.password;
    delete user.mobile_generated_code;
    delete user.email_generated_code;
    delete user.passwordResetToken;

    return user;
  }

  async generateAuthToken() {
    const token = await jwt.sign({ id: this.id }, "salar", {
      expiresIn: "1 days",
    });

    return token;
  }

  isEmailCodeMatch(any) {
    const code = this.email_generated_code === any;
    const exp = this.email_expire_time > Date.now();

    return code && exp ? true : false;
  }

  isMobileCodeMatch(any) {
    const code = this.mobile_generated_code === any;
    const exp = this.mobile_expire_time > Date.now();

    return code && exp ? true : false;
  }

  async createPasswordResetToken() {
    const resetToken = await generateRandomCode(12);

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExp = Date.now() + 900000;

    return resetToken;
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    f_name: {
      type: DataTypes.STRING,
    },
    l_name: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: "User",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        async checkUnique(val) {
          const usr = await User.findOne({
            where: { email: val, active: 1 },
          });
          if (usr) throw new AppError("Email Should Be Unique", 400);
        },
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkMobileNum(val) {
          if (!validator.isMobilePhone(val, ["en-CA"])) {
            throw new AppError("Wrong Mobile Number", 400);
          }
        },
        async checkUnique(val) {
          const usr = await User.findOne({
            where: { mobile: val, active: 1 },
          });
          if (usr) throw new AppError("Mobile Should Be Unique", 400);
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        if (val.length >= 8 && !val.toLowerCase().includes("password")) {
          const hashedPw = bcrypt.hashSync(val, 10);
          this.setDataValue("password", hashedPw);
        } else {
          throw new AppError("BAD PASSWORD", 400);
        }
      },
    },
    address: {
      type: DataTypes.STRING,
    },
    postalcode: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      allowNull: false,
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image_file: {
      type: DataTypes.STRING,
    },
    email_verified: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    email_generated_code: {
      type: DataTypes.STRING,
    },
    email_expire_time: {
      type: DataTypes.DATE,
    },
    mobile_verified: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: false,
    },
    mobile_generated_code: {
      type: DataTypes.STRING,
    },
    mobile_expire_time: {
      type: DataTypes.DATE,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },
    passwordResetExp: {
      type: DataTypes.DATE,
    },
  },
  {
    // defaultScope: {
    //   attributes: {
    //     exclude: ["password", "email_generated_code", "mobile_generated_code"],
    //   },
    // },
    sequelize,
    modelName: "User",
  }
);
// Mahdad created
// User.hasMany(Ticket, {
//   foreignKey: {
//     name: "frk_user",
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
// });

// Ticket.belongsTo(User, {
//   foreignKey: {
//     name: "frk_user",
//     type: DataTypes.BIGINT,
//     allowNull: false,
//   },
// });
module.exports = User;
