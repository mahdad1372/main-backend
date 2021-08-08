const express = require("express");

const catchAsync = require("../appError/catchAsync");
const Features = require("../model/features");
const Subscribe = require("../model/subscribe");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- SUBSCRIBE CREATION ------------------------------
router.post(
  "/subscribe",

  async (req, res) => {
    try {
      const subscribe = await Subscribe.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        status: req.body.status,
      });
      res.json(subscribe);
    } catch (err) {
      res.json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- SUBSCRIBE UPDATE --------------------------------
router.patch(
  "/subscribe/:id",

  async (req, res) => {
    try {
      const Optiontoupdate = await Subscribe.update(
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          mobile: req.body.mobile,
          status: req.body.status,
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

//-------------------------------- SUBSCRIBE DELETE --------------------------------
router.delete(
  "/subscribe/:id",
  catchAsync(async (req, res, next) => {
    const deleteOption = await Subscribe.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send(deleteOption);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- SUBSCRIBE GET SINGLE ----------------------------
router.get(
  "/subscribe/:id",

  async (req, res) => {
    const filtersubscribe = await Subscribe.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: filtersubscribe, status: 200 });
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- SUBSCRIBE GET ALL -------------------------------
router.get("/subscribe", async (req, res) => {
  try {
    const datas = await Subscribe.findAll({});
    res.json(datas);
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
