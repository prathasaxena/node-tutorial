const express = require('express');
const router = express.Router();
var coursesData = require('../dummyData/courses')
const Joi = require('joi')

router.get("/", (req, res) => {
    res.send(coursesData)
})

// to add parameter in get
router.get("/:id", (req, res) => {
    const course = coursesData.find(data => data.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Course not found')
    res.send(course.name)
})

function validateCourse(course) {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    })
    return schema.validate(course)
}
// post requests
router.post("/", (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const course = {
        id: coursesData.length + 1,
        name : req.body.name
    }
    res.send(course)
})

// put request
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
    // 404 on resource not found
    const course = coursesData.find(data => parseInt(req.params.id) === data.id)
    if (!course) return res.status(404).send("course not found")
    
    // delete it
    const index = coursesData.indexOf(course)
    coursesData.slice(index, 1)
  
    res.send(course)
})

module.exports = router
