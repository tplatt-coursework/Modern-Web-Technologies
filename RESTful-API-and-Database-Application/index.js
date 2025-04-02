var express = require('express');
var mongoose = require('mongoose');
var app = express();
const port = 3000;

async function main() {
    await mongoose.connect('mongodb://root:example@mongo:27017');
}

main().then(function() {
    console.log("Mongoose connected!");
}).catch(err => console.log(err));

var carModel = require("./models/car");

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

app.get("/", function(req, res){
    res.send("Mongo example server is live!");
})

app.get("/form", function(req, res){
    res.render("pages/form");
});

app.get("/garage", function(req,res) {
    carModel.listAllCars().then(function(cars){
        res.render("pages/garage", {cars:cars});
    });
    
})

app.get("/before/:year", function(req, res) {
    carModel.find({year : {$lt : req.params.year}}).then(function(cars){
        res.render("pages/garage", {cars:cars});
    });
});

app.post('/car', function(req, res){
    console.log("Car: " + JSON.stringify(req.body.car));
    var newCar = new carModel(req.body.car);
    
    newCar.save().then(function(){
        res.send("Added new car to database!");
    });

});

app.listen(port, function() {
  console.log("App listening on port " + port + " !");
});
