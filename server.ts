import { readFileSync } from "fs";
import express = require("express");
import https = require("https");
import { Server } from "socket.io";

const app = express();
const port = 3000;
const tlsPort = 3443;
const options = {
    key: readFileSync("/my/key.pem"),
    cert: readFileSync("/my/cert.pem"),
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/ok", (req, res) => {
    res.send("okkk");
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const tlsServer = https.createServer(options, app).listen(tlsPort, () => {
    console.log(`Example app listening on port ${port}`);
});

const io = new Server();

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("ping", (cb) => {
        console.log("ping");
        cb();
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});

io.attach(server);

const tlsIo = new Server();

tlsIo.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("ping", (cb) => {
        console.log("ping");
        cb();
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});
//dfs
tlsIo.attach(server);
