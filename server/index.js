import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", methods: ["GET", "POST"]
  },
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });

    socket.on("chat_message", (data) => {
        console.log(`Mensagem recebida: ${data.username}: ${data.message}`);
        io.emit("chat_message", data);
    });
});

server.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});