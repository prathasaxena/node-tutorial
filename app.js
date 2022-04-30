// basics
// const pathModule = require("./Libraries/path")
// const osModule = require("./Libraries/os")
// const fsModule = require("./Libraries/fileSystem")
// const events = require("./Libraries/events");
// const https = require("./Libraries/http");

const express = require('express');
const Joi = require('joi')
const coursesData = require('./dummyData/courses')
const app = express()
app.use(express.json())

// get requests
app.get("/", (req, res) => {
    res.send("Hello World!!!")
})

app.get("/api/courses", (req, res) => {
    res.send([1,2,3,4])
})

// to add parameter in get
app.get("/api/courses/:id", (req, res) => {
    const course = coursesData.find(data => data.id === parseInt(req.params.id))
    if (!course) res.status(404).send('Course not found')
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
    if (error) {
        res.status(400).send(error.details[0].message)
        return 
    }
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
    if (!course) res.status(404).send("course not found")
    
    // 400 on bad request
    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return 
    }
    course.name = req.body.name
    res.send(course)
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})


