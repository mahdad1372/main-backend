const express = require("express");
const AppError = require("../middleware/appError");
const catchAsync = require("../middleware/catchAsync");
const Features = require("../model/features");
const Aboutus = require("../model/aboutus");
const Product_category = require("../model/product_category");
const { uploadImageUrl } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- Aboutus CREATION ------------------------------
router.post(
  "/aboutus",
  uploadImageUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      //   console.log(req.file);
      const product = await Aboutus.create({
        description: req.body.description,
        video_url: req.body.image_file,
      });
      res.json({ data: product, status: 200 });
    } catch (err) {
      res.json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus UPDATE --------------------------------
router.patch(
  "/aboutus/:id",
  uploadImageUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      const product = await Product.update(
        {
          description: req.body.description,
          video_url: req.body.image_file,
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
    const findproduct = await Aboutus.findAll({
      where: {
        id: req.params.id,
      },
    });
    // const options = await findpackage[0].features.map((x) => x.options);
    // const prices = options[0].map((x) => x.price);
    // const totalprices = eval(prices.join("+"));
    res.status(200).json({ data: findproduct });
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- Aboutus GET ALL -------------------------------
router.get("/aboutus", async (req, res) => {
  try {
    const datas = await Aboutus.findAll({});
    res.json({ data: datas, status: 200 });
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
