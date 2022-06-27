// basics
// const pathModule = require("./Libraries/path")
// const osModule = require("./Libraries/os")
// const fsModule = require("./Libraries/fileSystem")
// const events = require("./Libraries/events");
// const https = require("./Libraries/http");

const config = require('config')
const express = require('express');
const Joi = require('joi')
const debug = require('debug')('app:development')
var coursesData = require('./dummyData/courses')
const log = require('./Libraries/express/customMiddleware');

const app = express()

//middlewares
app.use(express.json())
// custom middleware
app.use(log)
// built in middleware
app.use(express.urlencoded())
app.use(express.static("dummyData"))

// get environment
debug(process.env.NODE_ENV)
debug(app.get("env"))
debug(config.get('name'))

// get requests
app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

app.get("/api/courses", (req, res) => {
    res.send(coursesData)
})

// to add parameter in get
app.get("/api/courses/:id", (req, res) => {
    const course = coursesData.find(data => data.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    res.send(course.name)
})

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query)
});

function validateCourse(course) {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(course)
}

// post requests
app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = {
        id: coursesData.length + 1,
        name : req.body.name
    }
    res.send(course)
})

// put request
app.put("/api/courses/:id", (req, res) => {
    // 404 on resource not found
    const course = coursesData.find(data => parseInt(req.params.id) === data.id)
    if (!course) return res.status(404).send("course not found")
    
    // 400 on bad request
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
    course.name = req.body.name
    res.send(course)
})

// delete request
app.delete("/api/courses/:id", (req, res) => {
    // 404 on resource not found
    const course = coursesData.find(data => parseInt(req.params.id) === data.id)
    if (!course) return res.status(404).send("course not found")
    
    // delete it
    const index = coursesData.indexOf(course)
    coursesData.slice(index, 1)
  
    res.send(course)
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


