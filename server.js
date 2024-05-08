const express = require('express');
const path = require("path")
const getData = require("./sql.js");

Array.prototype.group = function(amount) {
  let out = [];
  let arr = this;
  
 while(arr.length > 0 ) {
  let a = arr.slice(0, amount);
  arr = arr.slice(amount, arr.length)
  out.push(a);
 }
  
  return out;
}

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('scripts'))
app.use(express.static('styles'))
app.use(express.static('images'))

app.get("/", async (req, res) => {
  res.render('index', {
    members: [
      {name:"Matheus Karam Westphalen", possition: "Chair", face: "./matheus/face.png", flag:  "./matheus/flag.png"},
      {name:"Rowan Richter", possition: "Co-Chair", face: "./rowen/face.png", flag:  "./rowen/flag.png"},
      {name:"Laura Boettcher", possition: "Webmaster", face: "./laura/face.png", flag:  "./laura/flag.png"},
      {name:"Katerina Latushka", possition: "Secretary", face: "./kate/face.png", flag:  "./kate/flag.png"},
      {name:"Malcolm Stone", possition: "Webmaster", face: "", flag:  "./rowen/flag.png"},
    ],
    events: (await getData()).group(4)
  });
})

app.listen(3001);
console.log(`Running on http://localhost:3001`);

