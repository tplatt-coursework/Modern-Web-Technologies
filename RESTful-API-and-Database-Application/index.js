let express = require('express')
let mongoose = require('mongoose')
let animeModel = require("./models/anime")
let config = require("./config")
let app = express()
const path = require('path')
const port = 3000
let mongoURI = `mongodb://root:t4J22uR8nEJYbe99zX4eQyFa5BA7VZF7A65e3zHk3gM2LUwUJF@${ config.localhost ? `mongodb` : `localhost` }:27017`


// Mongo Connection
async function main() {
    console.log(`Attempting to connect to '${mongoURI}'`)
    await mongoose.connect(mongoURI)
}

main().then(function() {
    console.log("Mongoose connected!")
}).catch(err => console.log(err))



// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// foobar ...im too tired to do good comments
app.get("/", function(req, res){
    try{
        res.status(200).send("RESTful API and Database Application is live.")
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get("/upload", function(req, res){
    try{
        res.status(200).sendFile(path.join(__dirname, 'views/pages', 'form.html'))
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get("/list", function(req,res) {
    try{
        res.status(200).sendFile(path.join(__dirname, 'views/pages', 'animeList.html'))
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get("/query", function(req,res) {
    try{
        res.status(200).sendFile(path.join(__dirname, 'views/pages', 'query.html'))
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.post('/anime', function(req, res){
    try{
        console.log("New anime uploaded: " + JSON.stringify(req.body.anime))
        let newAnime = new animeModel(req.body.anime)
        
        newAnime.save().then(function(){
            res.status(200).send("Added new anime to database!")
        })
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.get('/animes', async function(req,res){
    try{
        let mongo_query
        if(Object.keys(req.query).length === 0){
            if(config.verbose) console.log('listAllAnime')
            mongo_query = await animeModel.listAllAnime()
        }else{
            if(config.verbose) console.log('listFilteredAnime')
            mongo_query = await animeModel.listFilteredAnime(req.query)
        }
        res.status(200).send(mongo_query)
    }catch(e){
        console.error(`Error: ${e}`)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, function() {
  console.log("App listening on port " + port + " !")
})
