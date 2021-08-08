const express = require("express");

const Features = require("../model/features");
const Product = require("../model/product");
const Product_category = require("../model/product_category");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");
const { Op } = require("sequelize");
const router = new express.Router();

//-------------------------------- PRODUCTCATEGORY CREATION ------------------------------
router.post(
  "/productcategory",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    try {
      const product_category = await Product_category.create({
        name: req.body.name,
        image: req.body.image,
        icon: req.body.icon,
        description: req.body.description,
        is_in_first_page: req.body.is_in_first_page,
        is_it_child: req.body.is_it_child,
        parent_id: req.body.parent_id,
      });
      res.json(product_category);
    } catch (err) {
      res.json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- PRODUCTCATEGORY UPDATE --------------------------------
router.patch(
  "/productcategory/:id",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    try {
      const product = await Product_category.update(
        {
          name: req.body.name,
          image: req.body.image,
          icon: req.body.icon,
          description: req.body.description,
          is_in_first_page: req.body.is_in_first_page,
          is_it_child: req.body.is_it_child,
          parent_id: req.body.parent_id,
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

//-------------------------------- PRODUCTCATEGORY DELETE --------------------------------
router.delete("/productcategory/:id", async (req, res) => {
  try {
    await Product_category.destroy({
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

//-------------------------------- PRODUCTCATEGORY GET SINGLE ----------------------------
router.get("/productcategory/:id", async (req, res) => {
  try {
    const findproduct = await Product_category.findAll({
      where: {
        id: req.params.id,
      },
      include: Product_category,
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

//-------------------------------- PRODUCTCATEGORY GET ALL -------------------------------
router.get("/productcategory", async (req, res) => {
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
      var datas = await Product_category.findAll({
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
        var datas = await Product_category.findAll({
          order: [[req.query.type, req.query.order]],
          where: {
            [Op.and]: [filtered],
          },
        });
      } else {
        var datas = await Product_category.findAll({
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
