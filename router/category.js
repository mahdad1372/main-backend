const express = require("express");
const Category = require("../model/category");
const { uploadEditorImage } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");

const router = new express.Router();

router.post(
  "/api/category/photo",
  uploadEditorImage,
  uploadImageToAzure("test"),
  async (req, res) => {
    res.send({
      uploaded: 1,
      fileName: `${req.body.image_file}`,
      url: `https://hillzimage.blob.core.windows.net${req.body.image_file}`,
    });
  }
);

router.post("/api/category/add", async (req, res) => {
  const contentOrMeta = req.query.type;

  switch (contentOrMeta) {
    case "0":
      try {
        const category = await Category.create({
          title: req.body.title,
          content: req.body.content,
          category_type: contentOrMeta,
          // parent_id: 0,
        });
        res.status(201).send(category);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }

      break;

    case "1":
      try {
        const category = await Category.create({
          title: req.body.title,
          content: req.body.content,
          category_type: contentOrMeta,
          // parent_id: 0,
        });
        res.status(201).send(category);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }

      break;

    default:
      res.status(400).send({ error: "Bad Request" });
  }
});

router.patch("/api/category/update/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send();
    }

    if (req.body.title) {
      category.title = req.body.title;
    } else if (req.body.content) {
      category.content = req.body.content;
    }

    await category.save();

    res.send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/api/category/delete/:id", async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!category) {
      return res.status(404).send();
    }

    res.send();
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/api/category/all", async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { category_type: req.query.type },
    });
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/api/category/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).send();
    }

    if (req.query.post) {
      const where = { ...req.query };

      const excludeFields = [
        "offset",
        "order",
        "limit",
        "attributes",
        "group",
        "post",
      ];

      excludeFields.forEach((itm) => delete where[itm]);
      let order = [];

      if (req.query.order && typeof req.query.order == "string") {
        let sort = [];

        if (req.query.order.includes(";")) {
          sort = req.query.order.split(";");
          sort = sort.map((itm) => {
            return itm.split(",");
          });

          order = sort;
        } else {
          sort = req.query.order.split(",");
          order.push(sort);
        }
      }

      let limit = 10;
      let offset = 0;

      if (req.query.offset && req.query.limit) {
        offset = +req.query.offset || 0;
        limit = +req.query.limit || 5;
      }

      const posts = await category.getPosts({
        joinTableAttributes: [],
        where,
        order,
        limit,
        offset,
      });

      return res.send({ category, posts });
    }

    res.send({ category });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
