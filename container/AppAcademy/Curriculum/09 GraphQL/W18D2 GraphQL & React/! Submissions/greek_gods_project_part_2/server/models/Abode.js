const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbodeSchema = new Schema({
  name: { type: String },
  coordinates: { type: String },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: "god"
    }
  ]
});

module.exports = mongoose.model("abode", AbodeSchema);
