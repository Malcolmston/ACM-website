const express = require('express');
var path = require("path")
 


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('scripts'))
app.use(express.static('styles'))
app.use(express.static('images'))


app.get("/", (req, res) => {

})


app.listen(3000);
console.log(`Running on http://localhost:3000`);

