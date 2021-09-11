const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const AbodeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  coordinates: {
    type: String,
    required: true
  },
  gods: [{
    type: Schema.Types.ObjectId,
    ref: "god"
  }]
});

module.exports = mongoose.model("abode", AbodeSchema);