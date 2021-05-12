const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, { cors: { origin: "*" } });

app.use(express.static("./spa/dist/chat"));

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: "./spa/dist/chat" });
});

let clients = [];

io.on("connection", (socket) => {
  socket.on("clientConnect", (userName) => {
    clients.push(socket);

    socket.emit("chat", {
      name: null,
      message:
        clients.length == 1
          ? `Hola ${userName} bienvenido al chat, hay ${clients.length} usuario conectado`
          : `Hola ${userName} bienvenido al chat, hay ${clients.length} usuarios conectados`,
    });

    clients.forEach((client) => {
      if (socket.id !== client.id) {
        client.emit("chat", {
          name: null,
          message:
            clients.length == 1
              ? `Se ha conectado ${userName}. Hay ${clients.length} usuario conectado`
              : `Se ha conectado ${userName}. Hay ${clients.length} usuarios conectados`,
        });
      }
    });

    socket.on("chat", (message) => {
      clients.forEach((client) => {
        client.emit("chat", { name: userName, message: message });
      });
    });

    socket.on("disconnect", () => {
      clients = clients.filter((item) => {
        return item.id !== socket.id;
      });

      clients.forEach((client) => {
        client.emit("chat", {
          name: null,
          message:
            clients.length == 1
              ? `Se ha desconectado ${userName}, hay ${clients.length} usuario conectado`
              : `Se ha desconectado ${userName}, hay ${clients.length} usuarios conectados`,
        });
      });
    });
  });
});

httpServer.listen(process.env.PORT || 3000);
