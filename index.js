// index.js

const express = require('express');
const socketIO = require('socket.io-client');
const cors = require('cors');
const fs = require('fs')
require('./estimate');

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

app.get('/uwu', (req, res) => {
    res.status(200).json("uwu?")
})

app.get('*', (req, res) => {
    try {
        const parsedConnectedCount = parseInt(connectedCount.replaceAll(",", ""));
        const parsedLaughterCount = parseInt(laughterCount.replaceAll(",", ""));
        const parsedLastConnectedUpdate = parseInt(lastConnectedUpdate);
        const parsedLastLaughUpdate = parseInt(lastLaughUpdate);

        const responseObject = {
            connectedCount: parsedConnectedCount,
            laughterCount: parsedLaughterCount,
            lastConnectedUpdate: parsedLastConnectedUpdate,
            lastLaughUpdate: parsedLastLaughUpdate
        };

        res.status(200).json(responseObject);
    } catch (error) {
        console.error("Error occurred:", error);
        const estimatedValue = parseInt(fs.readFileSync('estimatedValue.txt', 'utf8'))
        res.status(500).json({ error: "Internal server error", estimatedValue });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
