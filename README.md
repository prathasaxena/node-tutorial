# node-tutorial

 window is used to access global variables

```global.console.log```

in node we don't have window, we have global

# Modules

variables and function defined in a file is not available in global, because their scope is limited to the file(in client side JS this does not hold true, and variables can be accessed in window scope)

At the core of node is modularity, every file is considered as module. every variable declared inside it has scope of that module. not available outside that module, unless you export it and make it public.

one module is main module.



# Creating Module

add a file logger.js

it is advisable to use const while importing module using require, so that we don't mistakenly override the value.

jsHint: tool to find out errors in compile time instead of getting it on run time

jshint app.js.

if you are exporting as

```module.exports.log = log(function name)```
```const logger = require('logger')```

```logger.log("eewrw")```

you are returning an object from module, but if you export it as(object would be useful if we had multiple variables and func to export)

```module.exports = log```

```const log = require('logger')```

```log("dfsw")```

Just importing the function log

# Module Wrapper function

node creates Module wrapper function for every module, which looks like

(function(exports, require, module, __filename, __dirname){

})

ways to export

```module.exports.log = log```
```module.exports = log```
```exports.log = log```
```exports = log (exports a ref to is module.exports, can't change that)```



require function is not global, but local to each file.



# Path Module

File System, HTTP, OS, Path, Process, Query String, Stream.

## Events

Signal indicates something has happened in the application.
In Node we can use HTTP to create a web server, and HTTP listens to a port.
On request HTTP raise an event. Our job is to read that request and repond.

Create class to catch events to avoid modular conflict.
Use the same class to create and catch events.

See the logger file
