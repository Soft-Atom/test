import { readFileSync } from "fs";
import express = require("express");
import https = require("https");
import { Server } from "socket.io";

const app = express();
const tlsPort = 3443;
const options = {
    key: readFileSync("./my/key.pem"),
    cert: readFileSync("./my/cert.pem"),
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/ok", (req, res) => {
    res.send("okkk");
});

const tlsServer = https.createServer(options, app).listen(tlsPort, () => {
    console.log(`Example app listening on port ${tlsPort}`);
});

const tlsIo = new Server(/*tlsServer*/);

tlsIo.on("connection", (socket) => {
    console.log(`connected with transport ${socket.conn.transport.name}`);

    socket.conn.on("upgrade", (transport) => {
        console.log(`transport upgraded to ${transport.name}`);
    });

    socket.on("ping", (cb) => {
        console.log("ping");
        cb();
    });

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});
//dfs
tlsIo.attach(tlsServer);
