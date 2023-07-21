const express = require("express");
const Glocilia = require("../models/glocilia");
const router = express.Router();
const Messages = require("../../messages/messages");

router.get("/:glocilia", (req, res, next) => {
  const glocilia = req.params.glocilia;
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
  const glocilia = req.params.glocilia;
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
  Glocilia.findOne(glocilia)
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

router
  .patch("/:glociliaId", (req, res, next) => {
    const glocilia = req.params.glocilia;

    Glocilia.findOne(glocilia).select("name").populate("princilia").exec();
  })
  .then((result) => {
    res.status(200).json({
      message: "Glocilia patch",
      request: {
        author: glocilia,
        id: result._id,
      },
      metadata: {
        host: req.hostname,
        method: req.method,
      },
    });
  })
  .catch((err) => {
    res.status(500).json({
      Message: "Glocilias - PATCH",
      error: {
        message: err.message,
      },
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
