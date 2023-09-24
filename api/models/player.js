const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  team: {
    type: String,
    ref: "Team",
    require: true,
  },
  number: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
