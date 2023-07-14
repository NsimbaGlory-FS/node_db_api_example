const express = require("express");
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
  res.json({
    Message: "Glocilias - GET",
    id: glociliaId,
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
