const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const uuid = require("uuid/v4")
//let DB = require("./db/db.json")

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//return the index.html file
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/public/index.html")))

//return the notes.html file. 
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname + "/public/notes.html")))


//API for renderning  notes stored on db
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
})

//API for storing user added note and renderning updated  notes stored on db.json
app.post("/api/notes", (req, res) => {

    let newNote ={
        id:uuid(),
        title:req.body.title,
        text:req.body.text
    };

    let oldNote =JSON.parse(fs.readFileSync(path.join(__dirname,"./db/db.json"),"utf-8")) 
    oldNote.push(newNote)
    fs.writeFileSync("./db/db.json",JSON.stringify(oldNote))
    res.json(oldNote)
})

app.delete("/api/notes/:id", (req, res) => {

    let choosen = req.params.id
    console.log(`inside /api/notes/:id ${choosen}`)
})

//Port listening on
app.listen(PORT, () => {
    console.log(`PORT Listening ON ${PORT}`)
})