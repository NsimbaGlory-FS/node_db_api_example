const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
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

module.exports = mongoose.model("Player", playerSchema);
