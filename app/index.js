const
    config = require('config'),
    path = require('path'),
    express = require('express'),
    app = express();

app.use(express.static(path.join(__dirname, '/../public')));

app.use(require('./router'));

require('./middlewares').forEach(middleware => app.use(middleware));

app.run = () => {
  app.listen(config.app.port, () => {
    console.info(`Server started on ${config.app.port} port`);
  });
};

module.exports = app;
