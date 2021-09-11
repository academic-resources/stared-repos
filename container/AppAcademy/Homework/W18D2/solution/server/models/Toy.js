const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  dogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "dog"
    }
  ]
});

const toy = mongoose.model("toy", ToySchema);
module.exports = toy;
