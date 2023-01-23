const express = require ("express");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
    "message" : "Server is running fine"
    }); 
});

app.get("*", (req, res) => {
    res.status(404).json({
       "message":"YEH kaha Aa gye hum"
    }); 
});

app.listen(port,(req,res)=>{
    console.log(`Server is Running at port ${port}`);
});