const express = require("express");
const userAuth = require("../middleware/userAuth");
const User = require("../model/user");
const { Op } = require("sequelize");
const AppError = require("../appError/appError");
const catchAsync = require("../appError/catchAsync");
const { sendVerifyCode, sendResetPassword } = require("../util/sendEmail");
const generateRandomCode = require("../util/randomCode");
const { uploadAvatarImage } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");
const isUserVerified = require("../middleware/isUserVerified");
const isUserRestriced = require("../middleware/isUserRestricted");
const bcrypt = require("bcryptjs");
const Authorize = require("../middleware/authorization");
const addUserComponents = require("../middleware/userComponent");
const getDealership = require("../middleware/getDealership");
const APIFeatures = require("../apiFeature/apiFeature");

const router = new express.Router();

//==============================================================================================
//==============================++++++SIGN UP USER++++++========================================
//==============================================================================================

router.post(
  "/api/user/signup",
  catchAsync(async (req, res, next) => {
    const emailCode = await generateRandomCode(3);

    const mobileCode = await generateRandomCode(3);

    const frk_role = 2;

    // frk_role in this controller should only be 2 (customer can sign in this route)

    const user = User.build({
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      mobile: req.body.mobile,
      email_generated_code: emailCode,
      email_expire_time: Date.now() + 900000,
      mobile_generated_code: mobileCode,
      mobile_expire_time: Date.now() + 900000,
      frk_role,
    });

    // SEND MESSAGE TO MOBILE NUMBER
    // await sendVerifyCode(user.email, emailCode);

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  })
);

//==============================================================================================
//=====================================+CONFIRM USER EMAIL+=====================================
//==============================================================================================

router.post(
  "/api/user/confirm/email",
  userAuth,
  catchAsync(async (req, res, next) => {
    if (req.body.code) {
      const match = req.user.isTempCodeMatch(req.body.code);
      if (!match) return next(new AppError("WRONG CODE OR EXPIRED", 400));
      req.user.email_generated_code = null;
      req.user.email_expire_time = null;
      email_verified = 1;

      await req.user.save();

      return res.send();
    }

    const code = await generateRandomCode(3);
    req.user.email_generated_code = code;
    req.user.email_expire_time = Date.now() + 900000;

    await sendVerifyCode(req.user.email, code);

    await req.user.save();

    res.send();
  })
);

//==============================================================================================
//==================================+CONFIRM USER MOBILE+=======================================
//==============================================================================================

// Reminder: user confrim mobile route

//==============================================================================================
//=======================================++USER LOGIN+==========================================
//==============================================================================================

router.post(
  "/api/user/login",
  catchAsync(async (req, res) => {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  })
);

//==============================================================================================
//===================================USER UPDATE PROFILE========================================
//==============================================================================================
//=========++++=============+++++NOTE : UPDATES ARE PARANOID+++++===============================
//==============================================================================================

// router.patch(
//   "/api/user/update",
//   userAuth,
//   isUserVerified,
//   isUserRestriced,
//   uploadAvatarImage,
//   uploadImageToAzure("test"),
//   catchAsync(async (req, res, next) => {
//     const isMatch = await bcrypt.compare(
//       req.body.oldPassword,
//       req.user.password
//     );

//     if (!isMatch) return next(new AppError("wrong password", 400));

//     const oldUser = await req.user.update({ active: 0 });

//     if (!req.body.password) return next(new AppError("NO PASSWORD", 400));

//     const safteyExcluded = [
//       "id",
//       "active",
//       "is_active",
//       "email_generated_code",
//       "mobile_generated_code",
//       "email_expire_time",
//       "mobile_expire_time",
//       "email_verified",
//       "mobile_verified",
//       "frk_role",
//       "passwordResetToken",
//       "passwordResetExp",
//       "frk_dealer_ship_id",
//     ];

//     const body = { ...req.body };

//     safteyExcluded.forEach((itm) => delete body[itm]);

//     delete oldUser.dataValues.id;

//     const emailVerified = req.body.email ? 1 : 0;

//     const mobileVerified = req.body.mobile ? 2 : 0;

//     switch (emailVerified + mobileVerified) {
//       case 1: {
//         const emailCode = await generateRandomCode(3);

//         const user = User.build({
//           ...oldUser.dataValues,
//           ...body,
//           password: req.body.password,
//           email_verified: 0,
//           email_generated_code: emailCode,
//           email_expire_time: Date.now() + 900000,
//           active: 1,
//         });

//         // await sendVerifyCode(user.email, emailCode);

//         await user.save();

//         const token = await user.generateAuthToken();

//         res.send({ user, token });
//         break;
//       }

//       case 2: {
//         const mobileCode = await generateRandomCode(3);

//         const user = User.build({
//           ...oldUser.dataValues,
//           ...body,
//           password: req.body.password,
//           mobile_verified: 0,
//           mobile_generated_code: mobileCode,
//           mobile_expire_time: Date.now() + 900000,
//           active: 1,
//         });

//         // SEND MESSAGE TO MOBILE NUMBER

//         await user.save();
//         const token = await user.generateAuthToken();

//         res.send({ user, token });

//         break;
//       }

//       case 3: {
//         const emailCode = await generateRandomCode(3);

//         const mobileCode = await generateRandomCode(3);

//         const user = User.build({
//           ...oldUser.dataValues,
//           ...body,
//           password: req.body.password,
//           mobile_verified: 0,
//           email_verified: 0,
//           email_generated_code: emailCode,
//           email_expire_time: Date.now() + 900000,
//           mobile_generated_code: mobileCode,
//           mobile_expire_time: Date.now() + 900000,
//           active: 1,
//         });

//         // SEND MESSAGE TO MOBILE NUMBER
//         // await sendVerifyCode(user.email, emailCode);

//         await user.save();

//         const token = await user.generateAuthToken();
//         res.send({ user, token });

//         break;
//       }

//       default: {
//         const user = await User.create({
//           ...oldUser.dataValues,
//           ...body,
//           password: req.body.password,
//           email_verified: 1,
//           mobile_verified: 1,
//           active: 1,
//         });

//         const token = await user.generateAuthToken();

//         res.send({ user, token });
//       }
//     }
//   })
// );

//==============================================================================================
//===================================USER DELETE ACCOUNT========================================
//==============================================================================================

router.delete(
  "/api/user/remove",
  userAuth,
  catchAsync(async (req, res, next) => {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    if (!isMatch) return next(new AppError("wrong password", 400));

    await req.user.update({
      active: 0,
    });
    res.send();
  })
);

//==============================================================================================
//====================================++USER ME ENDPOINT++========================================
//==============================================================================================

router.get(
  "/api/user/info",
  userAuth,
  isUserVerified,
  isUserRestriced,
  Authorize,
  addUserComponents,
  // getDealership,
  catchAsync(async (req, res, next) => {
    res.send({
      user: req.user,
      role: req.userRole,
      component: req.userComponent,
      // dealershipInfo: req.dealershipInfo,
    });
  })
);

//==============================================================================================
//=====================================VIP GET ALL USERS========================================
//==============================================================================================

router.get(
  "/api/users",
  userAuth,
  isUserVerified,
  isUserRestriced,
  Authorize,
  catchAsync(async (req, res) => {
    const { where, exclude, order, limit, offset } = APIFeatures(req.query);

    const users = await User.findAndCountAll({
      attributes: { exclude },
      where,
      order,
      limit,
      offset,
    });
    res.send(users);
  })
);

//==============================================================================================
//=======================================VIP RESTRIC USER=======================================
//==============================================================================================

router.get(
  "/api/user/restrict/:id",
  userAuth,
  isUserVerified,
  isUserRestriced,
  Authorize,
  catchAsync(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (!user) return next(new AppError("NOT FOUND", 404));

    const restricedUser = await user.update({
      is_active: req.body.is_active,
    });

    res.send(restricedUser);
  })
);

//==============================================================================================
//===================================USER FORGET PASSWORD=======================================
//==============================================================================================

router.post(
  "/api/user/forgotPassword",
  catchAsync(async (req, res, next) => {
    const user = await User.findOne({
      where: { email: req.body.email, active: 1 },
    });

    if (!user) return next(new AppError("NOT FOUND", 404));

    const token = await user.createPasswordResetToken();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/user/resetPassword/${token}`;

    await sendResetPassword(req.body.email, resetURL);

    await user.save();

    res.send();
  })
);

//==============================================================================================
//===================================USER PASSWORD RESET========================================
//==============================================================================================

router.patch(
  "/api/user/resetPassword/:token",
  catchAsync(async (req, res, next) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExp: { [Op.gt]: Date.now() },
      },
    });

    if (!user)
      return next(
        new AppError("PASSWORD RESET TOKEN IS WRONG OR EXPIRED", 404)
      );

    user.password = req.body.password;
    user.passwordResetToken = null;
    user.passwordResetExp = null;

    await user.save();

    const token = await user.generateAuthToken();

    res.send({ user, token });
  })
);

module.exports = router;
