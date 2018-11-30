const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    res.send('Done');
});
app.post('/', function (req, res) {
    // console.log(req.query);
    console.log(req.body.ref);
    res.send('done');
})
app.listen(3000, function () {
});