const mongoose = require('mongoose');
const CharacterSheetSchema = require('./CharacterSheet');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  characterSheets: [CharacterSheetSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
