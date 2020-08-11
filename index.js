#! /usr/bin/env node

const express = require("express");
const open = require("open");
const path = require('path')
const fs = require('fs-extra')
const app = express();
const port = 10010;
const curPath = process.cwd()
const color = require('colors')

let dirPath = ''

const argv = process.argv
if (argv.length > 2) {
  const newPath = path.resolve(curPath, argv[2])
  const isExit = fs.existsSync(newPath)
  if (isExit) {
    dirPath = newPath
  } else {
    console.log(`WARN: ${newPath} is not exit! \npath will use ${curPath}`.yellow)
    dirPath = curPath
  }
} else {
  dirPath = curPath
}

app.use(express.static(dirPath));
app.listen(port, () => {
  console.log(`work path is ${dirPath}`.green);
  open("http://127.0.0.1:10010");
});
