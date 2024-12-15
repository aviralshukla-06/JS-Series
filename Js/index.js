const express = require("express")

const app = express()

// let requestCounts = 0;

// function requestCount(req, res, next) {
//     requestCounts = requestCounts + 1;
//     next();
// }

function requiredMiddleware(req, res, next) {
    const a = req.query.a;
    const b = req.query.b;

    if (a && b) {
        next();
    } else {
        res.json({
            errorcode: 400,
            msg: "Kya re Lavde! Bakchodi karne aya hai."
        });

    }
}


app.use(requiredMiddleware);

app.get("/multiply", function (req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a * b;
    res.json({ result })
});

app.get("/divide", function (req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a / b;
    res.json({ result })
});

app.get("/add", function (req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a + b;
    res.json({ result })
});

app.get("/subtract", function (req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a - b;
    res.json({ result })
});

// app.get("/requests", function (req, res) {
//     res.send({ requestCounts });
// });

app.listen(3000)