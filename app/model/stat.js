const
  mongoose = require('mongoose'),
  {Schema} = mongoose;


let StatSchema = new Schema({
  weight: {type: Number, required: true},
  waist: {type: Number, required: true},
  arm: {type: Number, required: true},
  date: {type: Date, default: Date.now},
  sprint: {type: Schema.Types.ObjectId, ref: 'Sprint'}
});

module.exports = mongoose.model('Stat', StatSchema);
