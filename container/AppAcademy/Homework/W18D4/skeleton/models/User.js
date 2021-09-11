const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ]
});

const user = mongoose.model("user", UserSchema);
module.exports = user;
