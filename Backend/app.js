const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const router = express.Router();
const fs = require("fs");

const statisticsData = JSON.parse(fs.readFileSync(`./statistics.json`));
const lastStateData = JSON.parse(fs.readFileSync(`./lastStateData.json`));
// console.log(data);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.get("/lastState", (req, res) => {
  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      lastStateData,
    },
  });
  res.end();
});

app.get("/statistics", (req, res) => {
  res.status(200).send({
    status: "success",
    requestedAt: req.requestTime,
    data: {
      statisticsData,
    },
  });
  res.end();
});

app.post("/statistics", (req, res) => {
  const newStat = req.body
  const timestamp = new Date().toJSON();
  newStat['timestamp'] = timestamp
  statisticsData.splice(0, 0, newStat);

  fs.writeFile(`./statistics.json`, JSON.stringify(statisticsData), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        stats: statisticsData,
      },
    });
  });
});

app.options("/", (req, res) => {
  res.status(200).send({
    status: "success",
  });
  res.end();
});

module.exports = app;
