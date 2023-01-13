const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
require("./routes/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
