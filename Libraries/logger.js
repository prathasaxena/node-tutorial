const EventEmitter = require('events');
// not work
const emitter = new EventEmitter();

// send an event to events file listener
// wont be called because of seperate EventEmitter instances
function logger() {
    console.log("message")
    emitter.emit("logger", {message: 'log this message'});
}

// Extend EventEmitter class instead
// avoid different instance conflict
class Logger extends EventEmitter {
    log() {
        console.log("message")
        this.emit("logger", {message: 'log this message'});  
    }
 }
module.exports = Logger;