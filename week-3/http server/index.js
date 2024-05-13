const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 3000

app.use(bodyParser.json());

app.post('/conversations', (req, res) => {
  console.log(req.body.message);
  res.send('Hello world!')
})

app.listen(port, () => {
    console.log('Example app listening on port')

})
