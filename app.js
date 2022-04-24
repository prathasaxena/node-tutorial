// basics
// const pathModule = require("./Libraries/path")
// const osModule = require("./Libraries/os")
// const fsModule = require("./Libraries/fileSystem")
// const events = require("./Libraries/events");
// const https = require("./Libraries/http");

const express = require('express');
const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

app.get("/api/courses", (req, res) => {
    res.send([1,2,3,4])
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


