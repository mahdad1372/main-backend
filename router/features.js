const express = require("express");

const Features = require("../model/features");
const Packages = require("../model/packages");
const Option = require("../model/option");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- FEATURES CREATION ------------------------------
router.post(
  "/features",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    const Feature = await Features.create({
      frk_package_id: req.body.id,
      image: req.body.image,
      icon: req.body.icon,
      title: req.body.title,
      description: req.body.description,
      enable: req.body.enable,
      visible: req.body.visible,
      default: req.body.default,
    });
    try {
      res.send(Feature);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- FEATURES UPDATE --------------------------------
router.patch(
  "/features/:id",
  uploadPackageImage,
  uploadImageToAzure2("test"),
  async (req, res) => {
    try {
      const Featurestoupdate = await Features.update(
        {
          frk_package_id: req.body.id,
          image: req.body.image,
          icon: req.body.icon,
          title: req.body.title,
          description: req.body.description,
          enable: req.body.enable,
          visible: req.body.visible,
          default: req.body.default,
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

//-------------------------------- FEATURES DELETE --------------------------------
router.delete("/features/:id", async (req, res) => {
  try {
    await Features.destroy({
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

//-------------------------------- FEATURES GET SINGLE ----------------------------
router.get("/features/:id", async (req, res) => {
  try {
    const findFeatures = await Features.findAll({
      where: {
        id: req.params.id,
      },
      include: Option,
    });
    res.status(200).json(findFeatures);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

//-------------------------------- FEATURES GET ALL -------------------------------
router.get("/features", async (req, res) => {
  try {
    const datas = await Features.findAll({
      include: [Option, Packages],
      // include: {
      //   model: Packages,
      // },
    });

    res.status(200).json(datas);
  } catch (err) {
    res.status(400).json(err);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
