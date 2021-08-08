const express = require("express");

const Features = require("../model/features");
const Packages = require("../model/packages");
const Option = require("../model/option");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");
const sequelize = require("../db/db");
const router = new express.Router();

//-------------------------------- PACKAGE CREATION ------------------------------
router.post(
  "/package",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    const Package = await Packages.create({
      package_name: req.body.package_name,
      image: req.body.image,
      icon: req.body.icon,
      description: req.body.description,
      enable: req.body.enable,
      visible: req.body.visible,
      default: req.body.default,
      order: req.body.order,
      discount: req.body.discount,
    });
    try {
      res.send(Package);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- PACKAGE UPDATE --------------------------------
router.patch(
  "/package/:id",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    try {
      const packagetoupdate = await Packages.update(
        {
          package_name: req.body.package_name,
          image: req.body.image,
          icon: req.body.icon,
          description: req.body.description,
          enable: req.body.enable,
          visible: req.body.visible,
          default: req.body.default,
          order: req.body.order,
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

//-------------------------------- PACKAGE DELETE --------------------------------
router.delete("/package/:id", async (req, res) => {
  try {
    await Packages.destroy({
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
router.get("/package/:id", async (req, res) => {
  try {
    const findpackage = await Packages.findAll({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Features,
          include: {
            model: Option,
            attributes: [
              [sequelize.fn("sum", sequelize.col("price")), "price"],
            ],
          },
        },
      ],
    });

    res.status(200).json(findpackage);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- PACKAGE GET ALL -------------------------------
router.get("/package", async (req, res) => {
  try {
    const x = await Option.sum("price", {
      where: {
        frk_feature_id: 3,
      },
    });
    const packages = await Packages.findAll({
      include: [
        {
          model: Features,
          include: {
            model: Option,
            attributes: [
              [sequelize.fn("sum", sequelize.col("price")), "t_price"],
            ],
          },
        },
      ],
    });

    res.status(200).json(packages);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
