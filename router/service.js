const express = require("express");

const catchAsync = require("../appError/catchAsync");
const Features = require("../model/features");
const Service = require("../model/service");
const { uploadPackageImage } = require("../middleware/multer");
const { uploadImageToAzure2 } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- SERVICE CREATION ------------------------------
router.post(
  "/service",

  async (req, res) => {
    const titles = await Service.findOne({
      where: {
        title: req.body.title,
      },
    });
    if (titles) {
      return res
        .status(422)
        .send({ message: "Service with this title already exists" });
    } else {
      Service.create({
        type: req.body.type,
        image: req.files.image[0].path,
        title: req.body.title,
        description: req.body.description,
        number: req.body.number,
        enable: true,
        mincount: req.body.mincount,
        icon: req.files.icon[0].path,
        price: req.body.price,
        default: req.body.default,
        termdays: req.body.termdays,
      })
        .then((x) => res.json(x))
        .catch((err) => res.json(err));
    }
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- SERVICE UPDATE --------------------------------
router.patch(
  "/service/:id",

  async (req, res) => {
    Service.update(
      {
        enable: false,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() =>
        Service.findAll({
          where: {
            id: req.params.id,
          },
        }).then((todo) =>
          Service.create({
            type: req.body.type,
            image: req.files.image[0].path,
            title: req.body.title,
            description: req.body.description,
            number: req.body.number,
            enable: true,
            mincount: req.body.mincount,
            icon: req.files.icon[0].path,
            price: req.body.price,
            default: req.body.default,
            termdays: req.body.termdays,
          }).then(() => res.json("created successfully"))
        )
      )
      .catch((err) => res.json(err));
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- SERVICE DELETE --------------------------------
router.delete(
  "/service/:id",
  catchAsync(async (req, res, next) => {
    const deleteservice = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.send(deleteservice);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- SERVICE GET SINGLE ----------------------------
router.get(
  "/service/:id",

  async (req, res) => {
    const filterservice = await Service.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ data: filterservice });
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- SERVICE GET ALL -------------------------------
router.get("/service", async (req, res) => {
  try {
    const datas = await Service.findAll({});
    res.json(datas);
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
