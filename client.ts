import { io } from "socket.io-client";

const socket = io("https://test.ibiskrasnodar.ru/", {});

socket.on("connect", () => {
    console.log(`connected with transport ${socket.io.engine.transport.name}`);

    socket.io.engine.on("upgrade", (transport) => {
        console.log(`transport upgraded to ${transport.name}`);
    });
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
    console.error(err);
});

socket.on("disconnect", (reason) => {
    console.log(`disconnect due to ${reason}`);
});

setInterval(() => {
    const start = Date.now();
    socket.emit("ping", () => {
        console.log(`pong (latency: ${Date.now() - start} ms)`);
    });
}, 1000);
