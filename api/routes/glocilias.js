const express = require("express");
const Glocilia = require("../models/glocilia");
const router = express.Router();
const Messages = require("../../messages/messages");
const glocilia = require("../models/glocilia");

router.get("/:glocilia", (req, res, next) => {
  console.log("this is get");

  Glocilia.find(glocilia)
    .select("name")
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
        author: glocilia,
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

router.post("/", (req, res, next) => {
  Glocilia.clean(glocilia)
    .select("name")
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
        author: glocilia,
      });
    })

    .catch((err) => {
      res.json({
        Message: "Glocilias - POST",
        error: {
          message: err.message,
        },
      });
    });
});

router.get("/:glociliaId", (req, res, next) => {
  const glociliaId = req.params.glociliaId;
  glociliaId
    .findById(glociliaId)
    .select("name _id")
    .populate("princilia", "title glocilia")
    .exec()
    .then((glocilia) => {
      if (!glocilia) {
        console.log(glocilia);
        return res.status(404).json.json({
          message: Messages.glocilia_not_found,
        });
      }
      res.status(201).json({
        author: glocilia,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Message: "Glocilias - POST",
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:glociliaId", (req, res, next) => {
  const glociliaId = req.params.glociliaId;
  Glocilia.updateOne(glociliaId)
    .select("name")
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
        author: glocilia,
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
