// basics
// const pathModule = require("./Libraries/path")
// const osModule = require("./Libraries/os")
// const fsModule = require("./Libraries/fileSystem")
// const events = require("./Libraries/events");
// const https = require("./Libraries/http");

const config = require('config')
const express = require('express');
const debug = require('debug')('app:development')
const courses = require("./router/courses")
const log = require('./middleware/customMiddleware');

const app = express()

//middlewares
app.use(express.json())
// custom middleware
app.use(log)
// built in middleware
app.use(express.urlencoded())
app.use(express.static("dummyData"))
app.use("api/courses", courses)

// get environment
debug(process.env.NODE_ENV)
debug(app.get("env"))
debug(config.get('name'))

// get requests
app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query)
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


