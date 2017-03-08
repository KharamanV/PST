const
  config = require('config'),
  mongoose = require('mongoose');

mongoose.Promise = Promise;

// Register models
require('../model/stat');
require('../model/sprint');

// Connect to MongoDB
mongoose.connection
  .on('error', (err) => {
    console.error('[MongoDB] connection error:', err);
    process.exit(-1);
  })
  .on('open', () => console.info('[MongoDB] connected'));

mongoose.connect(config.mongo);

module.exports = mongoose;
