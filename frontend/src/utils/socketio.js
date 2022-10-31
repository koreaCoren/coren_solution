import io from "socket.io-client";

export let socket = io("https://192.168.0.86", { transports: ["websocket"] });
export const initSocketConnection = () => {
    if (socket) {
        return;
    }
    socket.connect();
}

export const sendsocketMessage = (cmd, body = null) => {
    if (socket === null || socket.connected === false) {
        initSocketConnection();
    }
    socket.emit("message", {
        cmd: cmd,
        body: body
    });
}

let cbMap = new Map();

export const socketInfoReceived = (cbType, cb) => {
    cbMap.set(cbType, cb);

    if (socket.hasListeners("message")) {
        socket.off("message");
    }

    socket.on("message", ret => {
        for (let [, cbValue] of cbMap) {
            cbValue(null, ret);
        }
    });
}

export const disconnectSocket = () => {
    if (socket === null || socket.connected === false) {
        return;
    }
    socket.disconnect();
    socket = undefined;
}