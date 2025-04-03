let express = require('express')
let mongoose = require('mongoose')
let animeModel = require("./models/anime")
let config = require("./config")
let app = express()
const path = require('path');
const port = 3000
let mongoURI = `mongodb://root:t4J22uR8nEJYbe99zX4eQyFa5BA7VZF7A65e3zHk3gM2LUwUJF@${ config.localhost ? `mongodb` : `localhost` }:27017`

async function main() {
    console.log(`Attempting to connect to '${mongoURI}'`)
    await mongoose.connect(mongoURI)
    
}

main().then(function() {
    console.log("Mongoose connected!")
}).catch(err => console.log(err))


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", function(req, res){
    try{
        res.status(200).send("RESTful API and Database Application is live.")
    }catch(e){
        console.log(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get("/upload", function(req, res){
    try{
        res.status(200).sendFile(path.join(__dirname, 'views/pages', 'form.html'));
    }catch(e){
        console.log(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get("/list", function(req,res) {
    try{
        animeModel.listAllAnime().then(function(anime){
            res.status(200).sendFile(path.join(__dirname, 'views/pages', 'animeList.html'));
        })
    }catch(e){
        console.log(`Error: ${e}`)
        res.send(`Internal Server Error`)
        res.statusCode(500)
    }
    
})

app.post('/anime', function(req, res){
    try{
        console.log("Anime: " + JSON.stringify(req.body.anime))
        let newAnime = new animeModel(req.body.anime)
        
        newAnime.save().then(function(){
            res.status(200).send("Added new anime to database!")
        })
    }catch(e){
        console.log(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }

})

app.get('/animes', async function(req,res){
    try{
        let mongo_query = await animeModel.listAllAnime({})
        console.log(mongo_query)
        res.status(200).send(mongo_query)
    }catch(e){
        console.log(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, function() {
  console.log("App listening on port " + port + " !")
})
