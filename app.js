const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {exec} = require('child_process');
const file = require('./file')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.post('/', async function (req, res) {
    console.log(req.query);
    console.log("body", req.body);
    if (!"path" in req.body || !"branch" in req.body || !"key" in req.body) {
        res.send('Bad request');
        return;
    }
    let data = {"path": req.body.path, "branch": req.body.branch, "key": req.body.key}
    await file.write(__dirname + '/data.json', JSON.stringify(data, null, '    '))

    res.send('Done');
});
app.post('/renew', async function (req, res) {
    console.log(req.query);
    if (!("ref" in req.body))
        return;
    let branch = req.body.ref.match(/refs\/heads\/(.*)/)[1]
    await git_pull();
    res.send('done');
})
app.listen(3000, function () {
});

async function git_pull() {
    let {path, branch} = await file.read_json(__dirname + "/data.json")
    let command = "cd " + path + " && git --git-dir=.git pull";

    let {stdout, stderr} = await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return
            }
            resolve({stdout: stdout, stderr: stderr});
        });
    })
}