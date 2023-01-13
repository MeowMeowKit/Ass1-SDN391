const express = require("express");
const nationRouter = require("./nations");
const playerRouter = require("./players");

module.exports = function (app) {
  app.use(express.json());
  app.use("/nations", nationRouter);
  app.use("/players", playerRouter);
};
