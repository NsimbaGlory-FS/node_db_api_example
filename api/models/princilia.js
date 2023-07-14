const mongoose = require("mongoose");

const princiliaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  author: String,
});

module.exports = mongoose.model("Princilia", princiliaSchema);
