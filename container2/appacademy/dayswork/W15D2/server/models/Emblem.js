const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmblemSchema = new Schema({
  name: { type: String },
  gods: [
    {
      type: Schema.Types.ObjectId,
      ref: "god"
    }
  ]
});

module.exports = mongoose.model("emblem", EmblemSchema);
