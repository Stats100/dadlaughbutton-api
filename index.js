const express = require('express');
const socketIO = require('socket.io-client');
const cors = require('cors');

const app = express();
const port = 9001;
app.use(cors('*'))

const socket = socketIO('https://dadlaughbutton.com/');

let laughterCount = 0;
let connectedCount = 0;
let lastLaughUpdate = 0
let lastConnectedUpdate = 0;

socket.on('getCount:laughs', function (v) {
    laughterCount = v;
    lastLaughUpdate = Date.now()
});

socket.on('getCount:connected', function (v) {
    connectedCount = v;
    lastConnectedUpdate = Date.now()
});

app.get('*', (req, res) => {
    res.json({
        connectedCount: parseInt(connectedCount.replaceAll(",", "")),
        laughterCount: parseInt(laughterCount.replaceAll(",", "")),
        lastUpdates: [
            {
                lastConnectedUpdate: parseInt(lastConnectedUpdate)
            },
            {
                lastLaughUpdate: parseInt(lastLaughUpdate)
            }
        ]
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
