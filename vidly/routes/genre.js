
const express = require('express');
const router = express.Router();
const Joi = require("joi")
const genre = require('../../dummyData/vidly-genre.json')

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

router.get('/', (req, res) => {
    res.send(genre.genre)
})

router.get('/:type', (req, res) => {
    const resp = genre[req.params.type]
    if (!resp) {
        res.status(404).send("genre not found")
     }
    res.send(resp)
})

router.put('/:type', (req, res) => {
    const genreSong = genre[req.params.type]
    if (!genreSong) {
        res.status(404).send("genre not found")
     }
    const { error } = validateReqBody(req.body);
    if (error) return res.status(400).send(error.message)
    genreSong.push(req.body.item)
    return res.send(genreSong)
})

router.post('/', (req, res) => {
    const { error } = validatePostReqBody(req.body);
    if (error) return res.status(400).send(error.message)
    genre.genre.push(req.body.genre)
    genre[req.body.genre] = req.body.songs
    return res.send(genre)
})

module.exports = router;
