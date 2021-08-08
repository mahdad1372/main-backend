const express = require("express");

const catchAsync = require("../appError/catchAsync");
const Features = require("../model/features");
const Contactus = require("../model/contactus");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");
const { Op } = require("sequelize");
const router = new express.Router();

//-------------------------------- CONTACT CREATION ------------------------------
router.post("/contactus", async (req, res) => {
  try {
    const contactus = await Contactus.create({
      f_name: req.body.name,
      f_lastname: req.body.lastname,
      status: req.body.status,
      mobile: req.body.mobile,
      email: req.body.email,
      message: req.body.message,
    });
    res.status(200).json(contactus);
  } catch (err) {
    res.status(400).json(err);
  }
});

//------------------------------------------------------------------------------------------

//-------------------------------- CONTACT UPDATE --------------------------------
router.patch(
  "/contactus/:id",

  async (req, res) => {
    try {
      const Optiontoupdate = await Contactus.update(
        {
          f_name: req.body.name,
          f_lastname: req.body.lastname,
          status: req.body.status,
          mobile: req.body.mobile,
          email: req.body.email,
          message: req.body.message,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json("updated successfully");
    } catch (err) {
      res.status(400).json("sorry you are wrong");
    }
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- CONTACT DELETE --------------------------------
router.delete(
  "/contactus/:id",
  catchAsync(async (req, res, next) => {
    const deleteOption = await Contactus.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send(deleteOption);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- CONTACT GET SINGLE ----------------------------
router.get(
  "/contactus/:id",

  async (req, res) => {
    const filtercontactus = await Contactus.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(filtercontactus);
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- CONTACT GET ALL -------------------------------
router.get("/contactus", async (req, res) => {
  try {
    Object.filter = (obj, predicate) =>
      Object.fromEntries(Object.entries(obj).filter(predicate));
    var queryies = req.query;
    var filtered = Object.filter(
      queryies,
      ([key, value]) =>
        key !== "type" && key !== "order" && key !== "offset" && key !== "limit"
    );

    if (
      req.query.offset &&
      req.query.limit &&
      req.query.order &&
      req.query.type
    ) {
      var datas = await Contactus.findAll({
        order: [[req.query.type, req.query.order]],
        where: {
          [Op.and]: [filtered],
        },
        offset: Number(req.query.offset),
        limit: Number(req.query.limit),
      });
    } else {
      if (
        !req.query.offset &&
        !req.query.limit &&
        req.query.order &&
        req.query.type
      ) {
        var datas = await Contactus.findAll({
          order: [[req.query.type, req.query.order]],
          where: {
            [Op.and]: [filtered],
          },
        });
      } else {
        var datas = await Contactus.findAll({
          where: {
            [Op.and]: [filtered],
          },
        });
      }
    }

    // res.json(
    //   datas.map((x) => ({
    //     id: x.id,
    //     name: x.f_name,
    //     lastname: x.f_lastname,
    //     status: x.status,
    //     mobile: x.mobile,
    //     email: x.email,
    //     message: x.message,
    //     createdAt: x.createdAt,
    //     updatedAt: x.updatedAt,
    //   }))
    // );
    res.json(datas);
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
