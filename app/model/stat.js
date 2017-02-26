const
  mongoose = require('mongoose'),
  {Schema} = mongoose;


let StatSchema = new Schema({
  weight: Number,
  waist: Number,
  arm: Number,
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Stat', StatSchema);
