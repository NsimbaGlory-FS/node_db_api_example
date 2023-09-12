const mongoose = require("mongoose");

const princiliaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Princilia", princiliaSchema);
