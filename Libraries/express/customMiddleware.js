function logging(req, res, next) {
    console.log("logging ... ")
    next()
}

module.exports = logging;