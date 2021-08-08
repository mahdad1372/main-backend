const express = require("express");

const Reqfordemo = require("../model/reqfordemo");
const { uploadVideoUrl } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");
const { Op } = require("sequelize");
const router = new express.Router();

//-------------------------------- REQFORDEMO CREATION ------------------------------
router.post("/reqfordemo", async (req, res) => {
  try {
    //   console.log(req.file);
    const reqfordemo = await Reqfordemo.create({
      f_name: req.body.name,
      f_lastname: req.body.lastname,
      status: req.body.status,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address,
      companyname: req.body.companyname,
      contact_method: req.body.contact_method,
      comment: req.body.comment,
    });
    res.json(reqfordemo);
  } catch (err) {
    res.json(err);
  }
});

//------------------------------------------------------------------------------------------

//-------------------------------- REQFORDEMO UPDATE --------------------------------
router.patch(
  "/reqfordemo/:id",

  async (req, res) => {
    try {
      const reqfordemo = await Reqfordemo.update(
        {
          f_name: req.body.name,
          f_lastname: req.body.lastname,
          status: req.body.status,
          email: req.body.email,
          mobile: req.body.mobile,
          address: req.body.address,
          companyname: req.body.companyname,
          contact_method: req.body.contact_method,
          comment: req.body.comment,
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

//-------------------------------- Aboutus DELETE --------------------------------
router.delete("/reqfordemo/:id", async (req, res) => {
  try {
    await Reqfordemo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("successfully deleted");
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus GET SINGLE ----------------------------
router.get("/reqfordemo/:id", async (req, res) => {
  try {
    const findreqfordemo = await Reqfordemo.findAll({
      where: {
        id: req.params.id,
      },
    });
    // const options = await findpackage[0].features.map((x) => x.options);
    // const prices = options[0].map((x) => x.price);
    // const totalprices = eval(prices.join("+"));
    res.status(200).json(findreqfordemo);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus GET ALL -------------------------------
router.get("/reqfordemo", async (req, res) => {
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
      var datas = await Reqfordemo.findAll({
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
        var datas = await Reqfordemo.findAll({
          order: [[req.query.type, req.query.order]],
          where: {
            [Op.and]: [filtered],
          },
        });
      } else {
        var datas = await Reqfordemo.findAll({
          where: {
            [Op.and]: [filtered],
          },
        });
      }
    }

    res.json(datas);
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
