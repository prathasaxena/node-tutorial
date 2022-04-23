// building block of node
//UpperCase, denotes class, hence create an instance of it
const EventEmitter = require('events')
const Logger = require('./logger');
const emitter = new EventEmitter();

// register a listener
// define before emitting otherwise nothing would happen
emitter.on('messageLogged',  (arg) => {
    console.log("message is logged", arg);
})

// raise an event
emitter.emit("messageLogged", { id: 1, url: 'http://' });

// log listener
// wont be called because of seperate EventEmitter instances
emitter.on('logger',  (arg) => {
    console.log("catch event", arg);
})

const logger = new Logger();
logger.on('logger', (arg) => {
    console.log("catch event", arg);
});


logger.log()