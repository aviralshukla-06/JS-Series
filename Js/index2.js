const express = require("express")

const app = express()

let requestPerUser = {};

setInterval(() => {
    requestPerUser = {};
}, 1000)


app.use(function (req, res, next) {
    const userId = req.headers['user-id']



    if (requestPerUser[userId]) {

        requestPerUser = requestPerUser + 1;

    } else {
        requestPerUser = 1;
        next();
    }

    if (requestPerUser[userId] > 5) {
        return res.status(429).send("Too many requests. Please try again later.");
    }
    next();

});

app.get("/path1", function (req, res) {
    res.json({
        msgcode: 200,
        msg: "OK Boss, Go for the ride!",
    });
});

app.get("/path2", function (req, res) {
    res.json({
        msgcode: 200,
        msg: "OK Boss, Go for the ride!",
    });
});

// app.use(function(err, req, res, next){
//     res.status(404).send({});
// })

app.listen(3000);