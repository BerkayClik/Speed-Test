var express = require('express')
var app = express()
var crypto = require('crypto');
require('dotenv').config()
app.set('view engine','ejs')


app.get('/',function (req,res) {
    res.render('hello.ejs')
})

var server = require('http').createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("listening on port " + PORT));

io.on('connection', function (socket) {
    console.log("connected")

    socket.on('clientPing', (msg) => {
        socket.emit('serverPong', msg)
    });

    socket.on('download', (chunkSize) => {
        const data = crypto.randomBytes(chunkSize);
        socket.emit('download', data);
    });

    socket.on('upload', (data) => {
        socket.emit('upload', Date.now());
    });

    socket.on('disconnect', function () {
        console.log("disconnected");
    })
});

app.use(function(req, res, next) {
    res.sendStatus(404);
});