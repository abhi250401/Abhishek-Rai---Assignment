const express = require("express");
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var wins = 0;
var losses = 0;

const app = express();
const cors = require("cors")
app.use(cors());

app.get("/", (req, res) => {
    res.send(`<html> <head></head><body> <h1>Player vs Computer Tic-Tac-Toe</h1>
     Wins : 
    <h2>${wins}</h2>
     Loss : 
    <h2>${losses}</h2></body></html>`);
});

app.post("/api", jsonParser, (req, res) => {
    //  console.log(req.body);
    wins = req.body.wins;
    losses = req.body.losses;
    res.send("success");
})
app.listen(3001, () => {
    console.log("server started 3001");
})
