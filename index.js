let express = require("express");

let app = express();

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/test", (req, res) => {
  let resObject = { status: 200, message: "ok" };

  res.send(resObject);
});

app.get("/time", (req, res) => {
  let date = new Date();
  let time = date.getHours() + ":" + date.getMinutes();
  let resTime = { status: 200, message: time };
  res.send(resTime);
});

app.listen(3000);
