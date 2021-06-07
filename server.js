const express = require("express")
const app = express()
const path = require("path")

let DB = require("./db/db.json")

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Route index 
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")))

//Route to take notes 
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname + "/public/notes.html")))


//API for renderning  notes stored on db
app.get("/api/notes", (req, res) => {
    res.json(DB)
})

//API for storing user added note and renderning updated  notes stored on db.json
app.post("/api/notes", (req, res) => {

    let newNoteTitle = req.body.title
    let newNoteText = req.body.text

    DB.push({ title: newNoteTitle, text: newNoteText })
    console.log(`I am on line 32  ${newNoteTitle} and text is ${newNoteText} ${DB}`)
    res.json(DB)
})

app.delete("/api/notes/:id", (req, res) => {

    let choosen = req.params.id
    console.log(`inside /api/notes/:id ${choosen}`)
})

//Port listening on
app.listen(PORT, () => {
    console.log(`PORT Listening ON ${PORT}`)
})