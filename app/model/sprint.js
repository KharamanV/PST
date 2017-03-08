const
  mongoose = require('mongoose'),
  {Schema} = mongoose;

let SprintSchema = new Schema({
  carbohydrate: Number,
  fat: Number,
  protein: Number,
  stats: [{type: Schema.Types.ObjectId, ref: 'Stat'}],
  start_date: Date,
  end_date: Date
});

module.exports = mongoose.model('Sprint', SprintSchema);
