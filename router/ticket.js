const express = require("express");

const Features = require("../model/features");
const Attach = require("../model/attach");
const Ticket = require("../model/ticket");

const { uploadImageUrl } = require("../middleware/multer");
const { uploadattaches } = require("../middleware/multer");
const { uploadImageToAzure44 } = require("../middleware/azure");

const router = new express.Router();

//-------------------------------- TICKET CREATION ------------------------------
router.post(
  "/ticket",
  // uploadattaches,
  // uploadImageToAzure44("test"),
  (req, res) => {
    res.json("good boy");
    // const ss = await Ticket.findAll();
    // Ticket.create({
    //   // frk_reply: 0,
    //   // reply: "",
    //   // number: id,
    //   frk_reply: 0,
    //   number: 2100000 + ss.length + 1,
    //   title: req.body.title,
    //   unit: req.body.unit,
    //   text: req.body.text,
    //   status: req.body.status,
    // })
    //   .then((x) => {
    //     Promise.all(
    //       req.files.map((itm) => {
    //         Attach.create({
    //           ticketId: x.id,
    //           attachfile: itm.originalname,
    //         });
    //       })
    //     ).then((x) =>
    //       res.status(200).json({ data: "succsessfully created", status: 200 })
    //     );
    //   })
    //   .catch((err) => {
    //     res.status(400).json({ status: 400 });
    //   });
  }
);

//------------------------------------------------------------------------------------------

//-------------------------------- TICKET UPDATE --------------------------------
router.patch(
  "/ticket/:id",
  uploadattaches,
  uploadImageToAzure44("test"),
  async (req, res) => {
    Ticket.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((x) => res.json({ data: "successfully updated", status: 200 }));
  }
);
//------------------------------------------------------------------------------------------

//-------------------------------- TICKET DELETE --------------------------------
router.delete("/ticket/:id", async (req, res) => {
  try {
    await Ticket.destroy({
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

//-------------------------------- TICKET GET SINGLE ----------------------------
router.get("/ticket/:id", async (req, res) => {
  try {
    const findproduct = await Ticket.findAll({
      where: {
        id: req.params.id,
      },
      include: Attach,
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

//-------------------------------- TICKET GET ALL -------------------------------
router.get("/ticket", async (req, res) => {
  try {
    const datas = await Ticket.findAll({
      include: Attach,
    });
    res.json({ data: datas, status: 200 });
  } catch (err) {
    res.status(400);
  }
});
//------------------------------------------------------------------------------------------

module.exports = router;
