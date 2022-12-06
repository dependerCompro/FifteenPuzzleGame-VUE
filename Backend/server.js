const app = require("./app");
const port = 8000;
const server = require("http").createServer(app);
const fs = require("fs");
const webSocket = require("ws");

const wss = new webSocket.Server({ server: server });

wss.on("connection", function (ws) {
  // console.log("A new client connected!");
  ws.send("Welcome new client!");
  ws.on("message", function incoming(message) {
    fs.writeFile(`./lastStateData.json`, message, (err) => {
      if (err) {
        console.log(err);
      } else {
        // console.log("Last State Updated");
        ws.send("Last State Updated");
      }
    });
  });
});

server.listen(port, () => {
  console.log("app runnig on port 8000");
});
