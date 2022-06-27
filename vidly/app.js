const express = require("express");
const Joi = require("joi");
const genre = require('../dummyData/vidly-genre.json')
const app = express();

const validateReqBody = (body) => {
    const schema = Joi.object({
        "item": Joi.string().min(3).required()
    })
    return schema.validate(body)
}

const validatePostReqBody = (body) => {
    const schema = Joi.object({
        "genre": Joi.string().min(3).required(),
        "songs": Joi.array().items(Joi.string()).required()
    })
    return schema.validate(body)
}

app.use(express.json())

app.get('/api/get/genre', (req, res) => {
    res.send(genre.genre)
})

app.get('/api/get/genre/:type', (req, res) => {
    const resp = genre[req.params.type]
    if (!resp) {
        res.status(404).send("genre not found")
     }
    res.send(resp)
})

app.put('/api/put/genre/:type', (req, res) => {
    const genreSong = genre[req.params.type]
    if (!genreSong) {
        res.status(404).send("genre not found")
     }
    const { error } = validateReqBody(req.body);
    if (error) return res.status(400).send(error.message)
    genreSong.push(req.body.item)
    return res.send(genreSong)
})

app.post('/api/post/genre/', (req, res) => {
    const { error } = validatePostReqBody(req.body);
    if (error) return res.status(400).send(error.message)
    genre.genre.push(req.body.genre)
    genre[req.body.genre] = req.body.songs
    return res.send(genre)
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("vidly application started!")
})