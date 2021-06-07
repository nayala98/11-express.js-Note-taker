const path = require("path")

//return the index.html file
module.exports = function (app) {
    //return the notes.html file.
    app.get("/notes", (req, res) => res.sendFile(path.join(__dirname,"../public/notes.html")))
    app.get("*", (req, res) => res.sendFile(path.join(__dirname,"../public/index.html")))
}