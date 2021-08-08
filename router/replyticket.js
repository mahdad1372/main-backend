const express = require("express");

const Features = require("../model/features");
const Attach = require("../model/attach");
const Ticket = require("../model/ticket");

const { uploadImageUrl } = require("../middleware/multer");
const { uploadattaches } = require("../middleware/multer");
const { uploadImageToAzure } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- REPLY CREATION ------------------------------
router.post(
  "/reply",

  async (req, res) => {
    Ticket.create({
      title: "",
      unit: "",
      number: 0,
      frk_reply: req.body.id,
      text: req.body.text,
      status: 2,
    })
      .then((x) => {
        Promise.all(
          req.files.map((itm) => {
            db.attach.create({
              ticketId: x.id,
              attachfile: itm.originalname,
            });
          })
        );
        res.json(data);
        // .then((x) => {
        //   res.json(x);
        // });
      })
      .catch((err) => res.status(400).json({ status: 400 }));
  }
);

//-------------------------------- REPLY GET SINGLE ----------------------------
router.get("/reply/:id", async (req, res) => {
  try {
    const datas = await Ticket.findAll({
      where: {
        frk_reply: req.params.id,
      },
      include: db.attach,
    });
    res.json({
      data: datas.map((i) => ({
        id: i.id,
        title: i.title,
        frk_reply: i.frk_reply,
        attaches: i.attaches,
        status: i.status,
        unit: i.unit,
        text: i.text,
        number: i.number,
        createdAt: i.createdAt,
        updatedAt: i.updatedAt,
      })),
      status: 200,
    });
  } catch (err) {
    res.status(400);
  }
});

module.exports = router;
