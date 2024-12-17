const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())


app.post("/add", function (req, res) {
    const a = parseFloat(req.body.a);
    const b = parseFloat(req.body.b);

    const result = a + b;
    res.json({ result })
});

app.listen(3000)