const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postcardSchema = new Schema({
  indicator: String,
  country: String,
  continent: String,
  QTH: String,
  year: String,
  location: {},
  imageFront: String,
  imageBack: String,
  notes: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Postcard = mongoose.model('Postcard', postcardSchema);
module.exports = Postcard;
