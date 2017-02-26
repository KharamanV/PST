const
    config = require('config'),
    path = require('path'),
    express = require('express'),
    app = express();

require('./service/mongodb');

app.use(express.static(path.join(__dirname, '/../public')));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('./router'));

require('./middlewares').forEach(middleware => app.use(middleware));

app.run = () => {
  app.listen(config.app.port, () => {
    console.info(`Server started on ${config.app.port} port`);
  });
};

module.exports = app;
