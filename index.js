#! /usr/bin/env node

const express = require('express');
const open = require('open');
const path = require('path');
const fs = require('fs-extra');
const app = express();
let port = 10010;
const curPath = process.cwd();
const color = require('colors');
const { exec } = require('child_process');

let dirPath = '';

const argv = process.argv;
if (argv.length > 2) {
    const newPath = path.resolve(curPath, argv[2]);
    const isExit = fs.existsSync(newPath);
    if (isExit) {
        dirPath = newPath;
    } else {
        console.log(`WARN: ${newPath} is not exit! \npath will use ${curPath}`.yellow);
        dirPath = curPath;
    }
} else {
    dirPath = curPath;
}

function checkPort() {
    exec(`lsof -i tcp:${port}`, (error, std) => {
        if (std.trim() == '') {
            console.log(`port ${port} is avaliable!`);
        } else {
            console.log(`port ${port} is in used!`);
            port++;
            checkPort();
        }
    });
}

checkPort();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

setTimeout(() => {
    app.use(express.static(dirPath));
    app.listen(port, () => {
        console.log(`work path is ${dirPath}`.green);
        open(`http://127.0.0.1:${port}`);
    });
}, 2000);
