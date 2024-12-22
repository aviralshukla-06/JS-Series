const express = require("express")
const app = express();
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db")
const jwt = require('jsonwebtoken')
const secretKey = 'heymahavirkarokalyan';



mongoose.connect("mongodb+srv://<username>:<password>@cluster0.slami.mongodb.net/Todo-qpp-DB")
app.use(express.json());

app.post("/signup", async function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password



    await UserModel.create({
        name: name,
        email: email,
        password: password
    })

    res.json({
        message: "You have successfull signed-up"
    })
})


app.post("/signin", async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, secretKey);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect details."
        })
    }

})

function auth(req, res, next) {

    const token = req.headers.token;

    const decodedData = jwt.verify(token, secretKey);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect details."
        })
    }
}

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    })

    res.json({
        userId: userId
    })
})

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;

    await TodoModel.findOne({
        userId: userId
    })



    res.json({
        todos
    })
})


app.listen(3000)