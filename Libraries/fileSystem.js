// work with files in node
const fs = require('fs');

// avoid using sync methods
const files = fs.readdirSync('./');
console.log(files)

fs.readdir('$', function (err, files) {
    if (err) console.log("Error", err);
    else console.log(files)
})