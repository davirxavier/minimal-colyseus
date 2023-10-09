import {LobbyRoom, Server} from "colyseus";
import { createServer } from "http";
import express from "express";
const port = Number(process.env.port) || 3000;

const app = express();
app.use(express.json());

const gameServer = new Server({
    server: createServer(app)
});

gameServer.define("lobby", LobbyRoom);
gameServer.listen(port).then();