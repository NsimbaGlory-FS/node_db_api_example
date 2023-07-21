const express = require("express");
const Glocilia = require("../models/glocilia");
const router = express.Router();
const Messages = require("../../messages/messages");

router.get("/", (req, res, next) => {
  res.json({
    Message: "Glocilias - GET",
  });
});

router.post("/", (req, res, next) => {
  res.json({
    Message: "Glocilias - POST",
  });
});

router.get("/:glociliaId", (req, res, next) => {
  const glociliaId = req.params.glociliaId;
  Glocilia.findById(glociliaId)
    .select("name _id")
    .populate("princilia")
    .exec()
    .then((glocilia) => {
      if (!glocilia) {
        console.log(glocilia);
        return res.status(404).json.json({
          message: Messages.glocilia_not_found,
        });
      }
      res.status(201).json({
        glocilia: glocilia,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:glociliaId", (req, res, next) => {
  const glociliaId = req.params.glociliaId;
  res.json({
    Message: "Glocilias - PATCH",
    id: glociliaId,
  });
});

router.delete("/:glociliaId", (req, res, next) => {
  const glociliaId = req.params.glociliaId;

  Glocilia.deleteOne({
    _id: glociliaId,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Glocilia Deleted",
        request: {
          method: "GET",
          url: "http://localhost:3000/glocilias/" + glociliaId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

module.exports = router;
