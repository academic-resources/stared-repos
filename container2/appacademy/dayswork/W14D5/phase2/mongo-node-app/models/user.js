var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  }
});

User = mongoose.model('User', UserSchema);
