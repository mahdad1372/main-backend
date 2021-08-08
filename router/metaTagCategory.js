const express = require("express");
const AppError = require("../appError/appError");
const catchAsync = require("../appError/catchAsync");
const MetaTagCategory = require("../model/metaTagCategory");

const router = new express.Router();

//-------------------------------- META TAG CATEGORY CREATION ------------------------------
router.post(
  "/api/meta/category/add",
  catchAsync(async (req, res, next) => {
    const metaTagCategory = await MetaTagCategory.create({
      title: req.body.title,
    });

    res.send(metaTagCategory);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- META TAG CATEGORY UPDATE --------------------------------
router.patch(
  "/api/meta/category/update/:id",
  catchAsync(async (req, res, next) => {
    const metaTagCategory = await MetaTagCategory.findByPk(req.params.id);

    if (!metaTagCategory) return next(new AppError("NOT FOUND", 404));

    metaTagCategory.title = req.body.title;

    await metaTagCategory.save();

    res.send(metaTagCategory);
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- META TAG CATEGORY DELETE --------------------------------
router.delete(
  "/api/meta/category/update/:id",
  catchAsync(async (req, res, next) => {
    const metaTagCategory = await MetaTagCategory.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!metaTagCategory) return next(new AppError("NOT FOUND", 404));

    res.send();
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- META TAG CATEGORY GET SINGLE ----------------------------
router.get(
  "/api/meta/category/single/:id",
  catchAsync(async (req, res, next) => {
    const metaTagCategory = await MetaTagCategory.findByPk(req.params.id);

    if (!metaTagCategory) return next(new AppError("NOT FOUND", 404));

    //*** JOINING RELATED TAGS ***
    const tags = await metaTagCategory.getCategories({
      where: { category_type: "1" },
    });

    res.send({ metaTagCategory, tags });
  })
);
//------------------------------------------------------------------------------------------

//-------------------------------- META TAG CATEGORY GET ALL -------------------------------
router.get(
  "/api/meta/category",
  catchAsync(async (req, res, next) => {
    const metaTagCategory = await MetaTagCategory.findAll();

    res.send(metaTagCategory);
  })
);
//------------------------------------------------------------------------------------------

module.exports = router;
