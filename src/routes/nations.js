const express = require("express");
const bodyParser = require("body-parser");

const nationRouter = express.Router();

nationRouter.use(bodyParser.json());

const nations = [
  {
    id: 1,
    name: "VietNam",
  },
  {
    id: 2,
    name: "France",
  },
  {
    id: 3,
    name: "Germany",
  },
];

nationRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  next();
});

nationRouter.get("/", (req, res, next) => {
  res.send(nations);
});

nationRouter.get("/:nationId", (req, res, next) => {
  const nation = nations.find((n) => n.id === parseInt(req.params.nationId));
  if (!nation) {
    res.statusCode = 404;
    res.send("The nation with the given ID was not found.");
  }
  res.send(nation);
});

nationRouter.post("/", (req, res, next) => {
  const newNations = {
    id: nations.length + 1,
    name: req.body.name,
  };
  if (newNations.name) {
    nations.push(newNations);
    res.send(newNations);
  } else {
    res.send("Error");
  }
});

nationRouter.post("/:nationId", (req, res, next) => {
  res.send("/nations is not support for POST with /nations/:id");
});

nationRouter.put("/:nationId", (req, res, next) => {
  const nation = nations.find((n) => n.id === parseInt(req.params.nationId));
  if (!nation) {
    res.statusCode = 404;
    return res.send("The nation with the given ID was not found.");
  }
  nation.name = req.body.name;
  res.send(nation);
});

nationRouter.put("/", (req, res, next) => {
  res.send("/nations is not support for PUT without /nations/:id");
});

nationRouter.delete("/:nationId", (req, res, next) => {
  const nation = nations.find((n) => n.id === parseInt(req.params.nationId));
  if (!nation) {
    res.statusCode = 404;
    return res.send("The nation with the given ID was not found.");
  }
  const index = nations.indexOf(nation);
  nations.splice(index, 1);
  res.send(`The nation with id: ${nation.id} has been deleted.`);
});

nationRouter.delete("/", (req, res, next) => {
  res.send("/nations is not support for DELETE");
});

module.exports = nationRouter;
