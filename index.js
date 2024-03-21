const express = require('express');
const socketIO = require('socket.io-client');

const app = express();
const port = 9001;

const socket = socketIO('https://dadlaughbutton.com/');

let laughterCount = 0;
let connectedCount = 0;

socket.on('getCount:laughs', function (v) {
    laughterCount = v;
});

socket.on('getCount:connected', function (v) {
    connectedCount = v;
});

setInterval(() => {
    socket.emit('increment:laughs');
}, 10);

app.get('/counts', (req, res) => {
    res.json({ laughterCount: parseInt(laughterCount.replaceAll(",", "")), connectedCount: parseInt(connectedCount.replaceAll(",", "")) });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
