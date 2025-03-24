
var express = require('express')
var mongoose = require('mongoose')
const path = require('path');

const app = express()
const port = 3000


mongoose.connect(`mongodb://localhost:27017/test`, {useNewUrlParser: true})
.catch(error => console.log("Something went wrong: " + error));

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

var carModel = require('./mongo/MongoDoc')

// http request handlers
app.post('/upload', (req, res) => {
    res.render("form")
})

app.get('/list', (req,res)=>{

})










//from Ham's example -------------

app.get("/garage", function(req,res) {
    carModel.listAllCars().then(function(cars){
        res.render("./pages/garage", {cars:cars})
    }).catch(function(error){ 
        console.log(error)
    })
})

app.post('/car', function(req, res){
    console.log("Car: " + JSON.stringify(req.body.car))
    var newCar = new carModel(req.body.car)
    
    newCar.save().then(function(){
        res.send("Added new car to database!")
    }).catch(function(err){
        console.log(err)
    })
})
// end of example --------------------

// Listen on the port
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})