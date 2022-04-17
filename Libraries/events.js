// building block of node
//UpperCase, denotes class, hence create an instance of it
const EventEmitter = require('events')

const emitter = new EventEmitter();

// register a listener
// define before emitting otherwise nothing would happen
emitter.on('messageLogged', function () {
    console.log("message is logged");
})

// raise an event
emitter.emit("messageLogged");
