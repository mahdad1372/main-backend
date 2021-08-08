const express = require("express");

const catchAsync = require("../appError/catchAsync");
const Features = require("../model/features");
const Option = require("../model/option");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");
const sequelize = require("../db/db");
const router = new express.Router();

//-------------------------------- OPTION CREATION ------------------------------
router.post("/option", async (req, res) => {
  const Options = await Option.create({
    frk_feature_id: req.body.id,
    type: req.body.type,
    mincount: req.body.mincount,
    enable: req.body.enable,
    price: req.body.price,
    discount: req.body.discount,
  });
  try {
    res.send(Options);
  } catch (err) {
    res.status(400).json(err);
  }
});

//------------------------------------------------------------------------------------------

//-------------------------------- OPTION UPDATE --------------------------------
router.patch(
  "/option/:id",

  async (req, res) => {
    try {
      const Optiontoupdate = await Option.update(
        {
          frk_feature_id: req.body.id,
          type: req.body.type,
          mincount: req.body.mincount,
          enable: req.body.enable,
          price: req.body.price,
          discount: req.body.discount,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json("updated successfully");
    } catch (err) {
      res.status(400).json("sorry you are wrog");
    }
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- OPTION DELETE --------------------------------
router.delete(
  "/option/:id",
  catchAsync(async (req, res, next) => {
    const deleteOption = await Option.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send(deleteOption);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- OPTION GET SINGLE ----------------------------
router.get(
  "/option/:id",

  catchAsync(async (req, res, next) => {
    const findOption = await Option.findAll({
      where: {
        id: req.params.id,
      },
      include: Features,
    });

    res.send(findOption);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- OPTION GET ALL -------------------------------
router.get(
  "/option",
  catchAsync(async (req, res, next) => {
    const datas = await Option.findAll({
      include: Features,
      // attributes: [[sequelize.fn("sum", sequelize.col("price")), "price"]],
    });

    res.send(datas);
  })
);
//------------------------------------------------------------------------------------------

module.exports = router;
