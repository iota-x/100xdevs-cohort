const express = require("express");

const app = express();

app.get("/health-checkup", function(req, res) {
    const username = req.headers.username;
    const password = req.headers.password;
    const KidneyId = Number(req.query.KidneyId);

    if (username !== "aaryan" || password !== "pass") {
        res.status(400).json({
            msg: "something up with your inputs"
        });
        return;
    }

    if (KidneyId !== 1 && KidneyId !== 2) { 
        res.status(400).json({
            msg: "something up with your inputs"
        });
        return;
    }

    res.json({
        msg: "everything is good"
    });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});
