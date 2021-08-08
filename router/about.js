const express = require("express");

const Features = require("../model/features");
const Aboutus = require("../model/aboutus");
const Product_category = require("../model/product_category");
const { uploadVideoUrl } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");
const { Op } = require("sequelize");
const router = new express.Router();

//-------------------------------- Aboutus CREATION ------------------------------
router.post(
  "/aboutus",
  uploadVideoUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      //   console.log(req.file);
      const aboutus = await Aboutus.create({
        description: req.body.description,
        video_url: req.body.image_file,
        whychooseus: req.body.whychooseus,
      });
      res.json(aboutus);
    } catch (err) {
      res.json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus UPDATE --------------------------------
router.patch(
  "/aboutus/:id",
  uploadVideoUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      const aboutus = await Aboutus.update(
        {
          description: req.body.description,
          video_url: req.body.video_url,
          whychooseus: req.body.whychooseus,
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
router.delete("/aboutus/:id", async (req, res) => {
  try {
    await Aboutus.destroy({
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
router.get("/aboutus/:id", async (req, res) => {
  try {
    const findaboutus = await Aboutus.findAll({
      where: {
        id: req.params.id,
      },
    });
    // const options = await findpackage[0].features.map((x) => x.options);
    // const prices = options[0].map((x) => x.price);
    // const totalprices = eval(prices.join("+"));
    res.status(200).json(findaboutus);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus GET ALL -------------------------------
router.get("/aboutus", async (req, res) => {
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
      var datas = await Aboutus.findAll({
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
        var datas = await Aboutus.findAll({
          order: [[req.query.type, req.query.order]],
          where: {
            [Op.and]: [filtered],
          },
        });
      } else {
        var datas = await Aboutus.findAll({
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
