const express = require("express");

const { users } = require("./data/users.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
    "message" : "Server is running fine"
    }); 
});

/** */

app.get("/users", (req, res) => {
    res.status(200).json({
        "success": "true",
        "data": users,
    });
});


app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success : false,
            message: "Not found",
        });
    }
    return res.status(200).json({
        success: true,
        message: user,
    });
});

app.post("/users", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    
    if (user) {
        res.status(404).json({
            success: false,
            message: "User already exist"
        });
    }
    users.push({
        id, name, surname, email, subscriptionType, subscriptionDate
    });
    return res.status(201).json({
        success: true,
        message: users
    });  
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data,
            }
        }
        return each;
    });
    return res.status(200).json({success:true , data : updatedUser})
});

app.get("*", (req, res) => {
    res.status(404).json({
       "message":"YEH kaha Aa gye hum"
    }); 
});

app.listen(port,(req,res)=>{
    console.log(`Server is Running at port ${port}`);
}); 