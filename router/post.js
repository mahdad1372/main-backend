const express = require("express");
const Post = require("../model/post");
const midCategoryPosts = require("../model/categoryPost");
const Category = require("../model/category");
const { uploadPostImage } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");

const router = new express.Router();

router.post(
  "/api/post/add",
  uploadPostImage,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      if (!req.body.idz?.length) {
        return res.status(400).send({ error: "Not found any Category or Tag" });
      }

      await Promise.all(
        req.body.idz.map(async (itm) => {
          try {
            const categoryOrTag = await Category.findByPk(itm);

            if (!categoryOrTag) throw new Error("NOT FOUND ID");
          } catch (err) {
            throw err;
          }
        })
      );

      const post = await Post.create({
        ...req.body,
        user_id: "1",
        author_id: "1",
      });

      await Promise.all(
        req.body.idz.map(async (itm) => {
          try {
            await midCategoryPosts.create({
              PostId: post.id,
              CategoryId: itm,
            });
          } catch (err) {
            throw err;
          }
        })
      );
      res.send(post);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

router.patch(
  "/api/post/update/:id",
  uploadPostImage,
  uploadImageToAzure("test"),
  async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) return res.status(404).send();

      const safteyExcluded = [
        "id",
        "user_id",
        "author_id",
        "total_rate",
        "visit_count",
      ];

      const body = { ...req.body };

      safteyExcluded.forEach((itm) => delete body[itm]);

      const updatedPost = await post.update(body);

      res.send(updatedPost);
    } catch (err) {
      console.log(err);

      res.status(400).send(err);
    }
  }
);

router.delete("/api/post/delete/:id", async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!post) {
      return res.status(404).send();
    }

    res.send();
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
});

router.get("/api/posts", async (req, res) => {
  try {
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

    const posts = await Post.findAll({
      where,
      order,
      limit,
      offset,
    });

    res.send(posts);
  } catch (err) {
    console.log(err);

    res.status(400).send(err);
  }
});

router.get("/api/post/:id", async (req, res) => {
  const contentOrMeta = req.query.type;

  switch (contentOrMeta) {
    case "0":
    case "1":
      try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).send();

        const tagOrCategory = await post.getCategories({
          joinTableAttributes: [],
          where: {
            category_type: contentOrMeta,
          },
        });

        return res.send(tagOrCategory);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }

      break;

    default:
      try {
        const post = await Post.findByPk(req.params.id);

        if (!post) return res.status(404).send();

        return res.send(post);
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
  }
});

module.exports = router;
