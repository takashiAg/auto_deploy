var express = require('express');
var app = express();
app.get('/', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    res.send('Done');
});
app.listen(3000, function () {
});