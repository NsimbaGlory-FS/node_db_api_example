const express = require("express");
const glocilia = require("../models/glocilia");
const router = express.Router();

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
    .exec()
    .then((glocilia) => {
      console.log(glocilia);
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
  res.json({
    Message: "Glocilias - DELETE",
    id: glociliaId,
  });
});

module.exports = router;
