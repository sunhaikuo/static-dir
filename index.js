const express = require("express");
const open = require("open");

const app = express()
const port = 10010

app.use(express.static(__dirname))
app.listen(port, () => {
    open('http://127.0.0.1:10010')
})