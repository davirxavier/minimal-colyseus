import {LobbyRoom, Server} from "colyseus";
import { createServer } from "http";
import express from "express";
import {WebSocketTransport} from "@colyseus/ws-transport";
const port = Number(process.env.port) || 3000;

const app = express();
app.use(express.json());
app.use('/', express.static('static'));

const gameServer = new Server({
    transport: new WebSocketTransport({server: createServer(app)})
});

gameServer.define("lobby", LobbyRoom);
gameServer.listen(port).then();