#! /usr/bin/env node

const express = require("express");
const open = require("open");

const app = express();
const port = 10010;
const path = process.cwd()

app.use(express.static(path));
app.listen(port, () => {
  console.log("当前运行的目录：", path);
  open("http://127.0.0.1:10010");
});
