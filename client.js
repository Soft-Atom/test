"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_client_1 = require("socket.io-client");
var socket = (0, socket_io_client_1.io)("https://test.ibiskrasnodar.ru/", {});
socket.on("connect", function () {
    console.log("connected with transport ".concat(socket.io.engine.transport.name));
    socket.io.engine.on("upgrade", function (transport) {
        console.log("transport upgraded to ".concat(transport.name));
    });
});
socket.on("connect_error", function (err) {
    console.log("connect_error due to ".concat(err.message));
    console.error(err);
});
socket.on("disconnect", function (reason) {
    console.log("disconnect due to ".concat(reason));
});
setInterval(function () {
    var start = Date.now();
    socket.emit("ping", function () {
        console.log("pong (latency: ".concat(Date.now() - start, " ms)"));
    });
}, 1000);
