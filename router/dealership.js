const express = require("express");
const { uploadImageToAzure } = require("../middleware/azure");
const catchAsync = require("../appError/catchAsync");
const { uploadAuthorImage } = require("../middleware/multer");
const createNewRecord = require("../util/createNewRecord");
const findByIdAndCheckExistence = require("../util/findById");
const checkExistenceAndRemove = require("../util/removeById");
const Dealership = require("../model/dealerShip");
const User = require("../model/user");
const generateRandomCode = require("../util/randomCode");
const userAuth = require("../middleware/userAuth");
const AppError = require("../appError/appError");
const City = require("../model/city");
const router = new express.Router();

//-------------------------------- DEALERSHIP CREATION ------------------------------
router.post(
  "/api/dealership/sign",
  catchAsync(async (req, res, next) => {
    const businessCityId = await findByIdAndCheckExistence(
      City,
      req.body.businessCityId
    );
    const mailingCityId = await findByIdAndCheckExistence(
      City,
      req.body.mailingCityId
    );

    const emailCode = await generateRandomCode(3);

    const mobileCode = await generateRandomCode(3);

    const user = User.build({
      email: req.body.owner_email,
      password: req.body.password,
      gender: req.body.gender,
      birthdate: req.body.birthdate,
      // req.body.birthdate
      mobile: req.body.owner_phone_number,
      email_generated_code: emailCode,
      email_expire_time: Date.now() + 900000,
      mobile_generated_code: mobileCode,
      mobile_expire_time: Date.now() + 900000,
      frk_role: 2,
    });

    // SEND MESSAGE TO MOBILE NUMBER
    // await sendVerifyCode(user.email, emailCode);

    await user.save();

    const dealership = await createNewRecord(
      Dealership,
      ({
        bussiness_name,
        dealership_licence_number,
        business_phone,
        business_fax,
        business_street,
        business_postal,
        business_website,
        owner_firstname,
        owner_lastname,
        owner_phone_number,
        owner_email,
        mailing_street,
        mailing_postal,
        primary_firstname,
        primary_lastname,
        primary_phone_number,
        primary_email,
        longitude,
        latitude,
        frk_dealer_owner_user_id,
      } = {
        ...req.body,
        frk_dealer_owner_user_id: user.id,
        frk_business_city_id: businessCityId.id,
        frk_mailing_city_id: mailingCityId.id,
      })
    );

    user.frk_dealer_ship_id = dealership.id;

    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ token });
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- DEALERSHIP UPDATE --------------------------------
router.patch(
  "/api/dealership/update/:id",
  userAuth,
  catchAsync(async (req, res, next) => {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    if (!isMatch) return next(new AppError("wrong password", 400));

    const softDeletedDealership = await checkExistenceAndRemove(
      Dealership,
      req.params.id
    );

    const safteyExcluded = [
      "frk_dealer_owner_user_id",
      "owner_email",
      "owner_phone_number",
      "status",
    ];

    const body = { ...req.body };

    safteyExcluded.forEach((itm) => delete body[itm]);

    delete softDeletedDealership.dataValues.id;

    const newDealership = await createNewRecord(Dealership, {
      ...softDeletedDealership.dataValues,
      ...body,
    });

    res.send();
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- DEALERSHIP DELETE --------------------------------
router.delete(
  "/api/dealership/delete/:id",
  userAuth,
  catchAsync(async (req, res, next) => {
    const isMatch = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    );

    if (!isMatch) return next(new AppError("wrong password", 400));

    const dealership = await checkExistenceAndRemove(Dealership, req.params.id);

    res.send();
  })
);
//------------------------------------------------------------------------------------------

router.patch(
  "/api/dealership/status/:id",
  catchAsync(async (req, res, next) => {
    const dealership = await findByIdAndCheckExistence(
      Dealership,
      req.params.id
    );

    const result =
      req.body.status === "2" ? 2 : req.body.status === "3" ? 3 : null;

    if (!result) return next(new AppError("BAD STATUS", 400));

    if (req.body.result !== "accept" && req.body.result !== "reject")
      return next(new AppError("BAD RESULT", 400));

    // SEND EMAIL
    // SEND MESSAGE

    await dealership.update({
      status: result,
      [req.body.result + "_message_SMS"]: req.body.sms,
      [req.body.result + "_message_email"]: req.body.email,
    });
  })
);

//-------------------------------- DEALERSHIP GET SINGLE ----------------------------
router.get(
  "/api/dealership/single/:id",
  catchAsync(async (req, res, next) => {
    const dealership = await findByIdAndCheckExistence(
      Dealership,
      req.params.id
    );

    res.send({ dealership });
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- DEALERSHIP GET ALL -------------------------------
router.get(
  "/api/dealerships",
  catchAsync(async (req, res, next) => {
    const dealerships = await Dealership.findAll();

    res.send(dealerships);
  })
);
//------------------------------------------------------------------------------------------

module.exports = router;
