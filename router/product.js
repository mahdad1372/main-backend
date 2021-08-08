const express = require("express");

const Features = require("../model/features");
const Product = require("../model/product");
const Product_category = require("../model/product_category");
const { uploadImageUrl } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");
const { Op } = require("sequelize");
const router = new express.Router();

//-------------------------------- PACKAGE CREATION ------------------------------
router.post(
  "/product",
  uploadImageUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        image_url: req.body.image_file,
        is_in_first_page: req.body.is_in_first_page,
        frk_category: req.body.frk_category,
      });
      res.json(product);
    } catch (err) {
      res.json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- PACKAGE UPDATE --------------------------------
router.patch(
  "/product/:id",
  uploadImageUrl,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      const product = await Product.update(
        {
          name: req.body.name,
          description: req.body.description,
          image_url: req.body.image_file,
          is_in_first_page: req.body.is_in_first_page,
          frk_category: req.body.frk_category,
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

//-------------------------------- PACKAGE DELETE --------------------------------
router.delete("/product/:id", async (req, res) => {
  try {
    await Product.destroy({
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

//-------------------------------- PACKAGE GET SINGLE ----------------------------
router.get("/product/:id", async (req, res) => {
  try {
    const findproduct = await Product.findAll({
      where: {
        id: req.params.id,
      },
      include: Product_category,
    });
    // const options = await findpackage[0].features.map((x) => x.options);
    // const prices = options[0].map((x) => x.price);
    // const totalprices = eval(prices.join("+"));
    res.status(200).json(findproduct);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- PACKAGE GET ALL -------------------------------
router.get("/product", async (req, res) => {
  try {
    // const datas = await Product.findAll({
    //   include: Product_category,
    // });
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
      var datas = await Product.findAll({
        include: Product_category,
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
        var datas = await Product.findAll({
          include: Product_category,
          order: [[req.query.type, req.query.order]],
          where: {
            [Op.and]: [filtered],
          },
        });
      } else {
        var datas = await Product.findAll({
          include: Product_category,
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
