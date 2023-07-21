const mongoose = require("mongoose");

const princiliaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Princilia", princiliaSchema);
