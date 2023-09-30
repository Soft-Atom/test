"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var express = require("express");
var https = require("https");
var socket_io_1 = require("socket.io");
var app = express();
var port = 3000;
var tlsPort = 3443;
var options = {
    key: (0, fs_1.readFileSync)("/my/key.pem"),
    cert: (0, fs_1.readFileSync)("/my/cert.pem"),
};
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/ok", function (req, res) {
    res.send("okkk");
});
var server = app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
var tlsServer = https.createServer(options, app).listen(tlsPort, function () {
    console.log("Example app listening on port ".concat(port));
});
var io = new socket_io_1.Server();
io.on("connection", function (socket) {
    console.log("connect ".concat(socket.id));
    socket.on("ping", function (cb) {
        console.log("ping");
        cb();
    });
    socket.on("disconnect", function () {
        console.log("disconnect ".concat(socket.id));
    });
});
io.attach(server);
var tlsIo = new socket_io_1.Server();
tlsIo.on("connection", function (socket) {
    console.log("connect ".concat(socket.id));
    socket.on("ping", function (cb) {
        console.log("ping");
        cb();
    });
    socket.on("disconnect", function () {
        console.log("disconnect ".concat(socket.id));
    });
});
tlsIo.attach(server);
