const express = require("express");
const app = express();

require("dotenv").config({ path: "./config/config.env" });

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

let responseObjetc = {};
app.enable("trust proxy");

app.get("/api/whoami", (req, res) => {
  responseObjetc["ipaddress"] = req.ip;
  responseObjetc["language"] = req.get("Accept-Language");
  responseObjetc["software"] = req.get("User-Agent");

  res.json(responseObjetc);
});

const PORT = process.env.PORT || 5000;
// listen for requests :)
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
