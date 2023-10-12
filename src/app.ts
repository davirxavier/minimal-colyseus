import {LobbyRoom, Server} from "colyseus";
import expressify from 'uwebsockets-express';
import {uWebSocketsTransport} from "@colyseus/uwebsockets-transport";
import express from "express";
const port = Number(process.env.port) || 3000;

const transport = new uWebSocketsTransport();
const gameServer = new Server({
    transport: transport
});

const app = expressify(transport.app);
app.use(express.json());
app.use('/', express.static('static'));

app.use('*', (req, res) => {
    console.log(`Not found: ${req.baseUrl}`);
    res.sendStatus(404);
});

gameServer.define("lobby", LobbyRoom);
gameServer.listen(port).then();