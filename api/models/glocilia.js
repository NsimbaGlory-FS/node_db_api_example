const mongoose = require("mongoose");

const glociliaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  glocilia: {
    type: String,
    require: true,
  },
  name: {
    type: mongoose.Schema.Types.ObjectId(),
    ref: "Princilia",
    require: true,
  },
});

module.exports = mongoose.model("Glocilia", glociliaSchema);
