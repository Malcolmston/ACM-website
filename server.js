const express = require('express');
var path = require("path")
 


const app = express();

app.set('view engine', 'ejs');
app.use(express.static('scripts'))
app.use(express.static('styles'))
app.use(express.static('images'))


app.get("/", (req, res) => {
  res.render('index', {
    members: [
      {name:"Matheus Karam Westphalen", possition: "Chair", face: "./matheus/face.png", flag:  "./matheus/flag.png"},
      {name:"Rowan Richter", possition: "Co-Chair", face: "./rowen/face.png", flag:  "./rowen/flag.png"},
      {name:"Laura Boettcher", possition: "Webmaster", face: "./laura/face.png", flag:  "./laura/flag.png"},
      {name:"Katerina Latushka", possition: "Secretary", face: "./kate/face.png", flag:  "./kate/flag.png"},
      {name:"Malcolm Stone", possition: "Webmaster", face: "", flag:  "./rowen/flag.png"},

    ]
  });
})


app.listen(3000);
console.log(`Running on http://localhost:3000`);

