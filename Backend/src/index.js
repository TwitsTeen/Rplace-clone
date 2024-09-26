const express = require("express");
const cors = require("cors");
const { User, UserDelayList } = require("./UserManagement");

const app = express();
const port = 3000;
const size = 40;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

grid = Array(size * size).fill("#FFFFFF");
userDelayList = new UserDelayList();

app.get("/grid", (req, res) => {
  res.send(grid).status(200);
});

app.post("/grid/:index", (req, res) => {
  const ip = req.ip;
  const userAgent = req.get("User-Agent");
  const user = new User(ip, userAgent);

  const index = req.params.index;
  const color = req.body.color;
  if (userDelayList.has(user)) {
    res.status(429).send("You are on delay list");
    return;
  }
  userDelayList.add(user);
  grid[index] = color;
  res.send(grid).status(200);
});

app.get("/delay", (req, res) => {
  const ip = req.ip;
  const userAgent = req.get("User-Agent");
  const user = new User(ip, userAgent);
  if (userDelayList.has(user)) {
    res.status(200).json({ message: "You are on delay list" });
    return;
  }
  res.status(200).json({ message: "You are not on delay list" });
});
