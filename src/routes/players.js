const express = require("express");
const bodyParser = require("body-parser");

const playerRouter = express.Router();

playerRouter.use(bodyParser.json());

const players = [
  {
    id: 1,
    name: "Player 1",
  },
  {
    id: 2,
    name: "Chi Cuong",
  },
];

playerRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
});

playerRouter.get("/", (req, res, next) => {
  res.send(players);
});

playerRouter.get("/:playerId", (req, res, next) => {
  const player = players.find((n) => n.id === parseInt(req.params.playerId));
  if (!player) {
    res.statusCode = 404;
    return res.send("The player with the given ID was not found.");
  }
  res.send(player);
});

playerRouter.post("/", (req, res, next) => {
  const newPlayer = {
    id: players.length + 1,
    name: req.body.name,
  };
  players.push(newPlayer);
  res.send(newPlayer);
});

playerRouter.post("/:playerId", (req, res, next) => {
  res.send("/players is not support for POST with /players/:id");
});

playerRouter.put("/", (req, res, next) => {
  res.send("/players is not support for PUT without /players/:id");
});

playerRouter.put("/:playerId", (req, res, next) => {
  const player = players.find((n) => n.id === parseInt(req.params.playerId));
  if (!player) {
    res.statusCode = 404;
    return res.send("The player with the given ID was not found.");
  }
  player.name = req.body.name;
  res.send(player);
});

playerRouter.delete("/", (req, res, next) => {
  res.send("/players is not support for DELETE");
});

playerRouter.delete("/:playerId", (req, res, next) => {
  const player = players.find((n) => n.id === parseInt(req.params.playerId));
  if (!player) {
    res.statusCode = 404;
    return res.send("The player with the given ID was not found.");
  }
  const index = players.indexOf(player);
  players.splice(index, 1);
  res.send(`The Player with name: ${player.name} has been deleted.`);
});

module.exports = playerRouter;
