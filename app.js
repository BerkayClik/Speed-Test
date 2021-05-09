var express = require('express')
var app = express()
var crypto = require('crypto');
require('dotenv').config()
app.set('view engine','ejs')


app.get('/',function (req,res) {
    res.render('index.ejs')
})

var server = require('http', { wsEngine: 'ws' }).createServer(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("listening on port " + PORT));

io.on('connection', function (socket) {
    socket.on('userPingValue', (msg) => {
        socket.emit('serverPingValue', msg)
    });

    socket.on('download', (bitsSentSize) => {
        const data = crypto.randomBytes(bitsSentSize);
        socket.emit('download', data);
    });

    socket.on('upload', (data) => {
        socket.emit('upload', Date.now());
    });
});

app.use(function(req, res, next) {
    res.sendStatus(404);
});