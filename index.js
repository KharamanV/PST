const
    express = require('express'),
    app = express(),
    config = require('config');

app.use(express.static('public'));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.get('/api/data', (req, res) => {
   res.json({data: 123});
});

app.listen(config.get('app.port'), () => {
    console.info(`Server started on ${config.get('app.port')} port`);
});