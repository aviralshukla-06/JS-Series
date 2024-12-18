const express = require("express")
const app = express();
const jwt = require('jsonwebtoken')
const secretKey = 'heymahavirkarokalyan';
app.use(express.json());


// let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// let token = "";
// function generateTokens() {
//     for (let i = 0; i < 50; i++) {
//         token += options[Math.floor(Math.random() * options.length)]
//     }
//     return token
// }




const users = []
console.log(users);

app.post("/signup", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You have successfull signed-up"
    })
})



app.post("/signin", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    let foundUser = null;


    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i];
        }
    }

    if (foundUser) {
        // const token = generateTokens()
        const token = jwt.sign({
            username: username
        }, secretKey)
        // foundUser.token = token;
        res.json({
            token: token
        })
    }


    console.log(users);


})

app.get("/me", function (req, res) {
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, secretKey)
    const username = decodedInfo.username;

    res.json({
        username: username
    })

    // let foundUser = users.find(u => u.token === token);

    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].token == token) {
    //         foundUser = users[i];
    //     }
    // }

    // if (foundUser) {
    //     res.json({
    //         username: foundUser.username,
    //         password: foundUser.password
    //     })
    // } else {
    //     res.json({
    //         message: "Abe laude... Bakchodi karne aya hai!!!"
    //     })
    // }


})

app.listen(3000);