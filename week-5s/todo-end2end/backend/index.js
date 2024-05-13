const express = require('express');
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos", async function(req, res) {
    const todos = await todo.find({}); // give me everything (no conditions)
    
    res.json({
        msg: "Todo created"
    })

})

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedTodo = updateTodo.safeParse(updatePayload);
    if (!parsedTodo.success) {
        res.status(411).json({
            msg: "You sent the wrong ID",
        })
        return;
    }
    await todo.update({
        _id: req.body.id // why _id? because mongo autogenerates _id and here I need to update based on that
    }, {
        completed: true
    })
    res.json ({
        msg: "Todo marked as completed"
    })
})

app.listen(3000);