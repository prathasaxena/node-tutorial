const http = require('http')

const callback = (req, res) => {
    if (req.url == '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url == '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
}
const server = http.createServer(callback); // server is a event emitter

server.on("connection", (socket) => {
    console.log("New connection ...");
})
server.listen(3000);

console.log('listening to port 3000')