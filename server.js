"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var express = require("express");
var socket_io_1 = require("socket.io");
var ocsp = require("ocsp");
var app = express();
var tlsPort = 3443;
var options = {
    key: (0, fs_1.readFileSync)("./my/key.pem"),
    cert: (0, fs_1.readFileSync)("./my/cert.pem"),
};
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/ok", function (req, res) {
    res.send("okkk");
});
var server = ocsp.Server.create(options);
server.addCert(43, "good");
server.addCert(44, "revoked", {
    revocationTime: new Date(),
    revocationReason: "CACompromise",
});
var tlsServer = server.listen(tlsPort, function () {
    console.log("Example app listening on port ".concat(tlsPort));
});
var tlsIo = new socket_io_1.Server( /*tlsServer*/);
tlsIo.on("connection", function (socket) {
    console.log("connected with transport ".concat(socket.conn.transport.name));
    socket.conn.on("upgrade", function (transport) {
        console.log("transport upgraded to ".concat(transport.name));
    });
    socket.on("ping", function (cb) {
        console.log("ping");
        cb();
    });
    socket.on("disconnect", function () {
        console.log("disconnect ".concat(socket.id));
    });
});
//dfs
tlsIo.attach(tlsServer);
