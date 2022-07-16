const express = require("express");
const genreRouter = require("./routes/genre")

const app = express();



app.use(express.json())
app.use("/api/genre", genreRouter)



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("vidly application started!")
})