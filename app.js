const express = require('express')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB")
const letterSchema = {
    title: "String",
    content: "String"
}

const app = express()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

const Letter = mongoose.model("Letter", letterSchema)

app.post("/", function(req, res){
    
    const newLetter = new Letter({
        title: req.body.title,
        content: req.body.content
    })
newLetter.save().then(() => {
res.redirect("/")
}).catch((error) => {
    res.send("Well there seems to be some problem with the code.")
})
 
})



app.listen((3000), () => {
    console.log("you are now connected to the server")
})