"use strict"

const express = require("express")
let app = express()

app.use('/', express.static(__dirname + '/app'))
app.listen(9000, () => {
  console.log("it is running man")
})