const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")



const app = express();

const items = ["Study Web Development", "Complete resume", "Apply to companies"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  //Exported from date.js
  const day = date.getDates();
  
  res.render('list', {listTitle: day, newListItems: items});

});

app.post("/", function(req,res){
  console.log(req.body);

  const item = req.body.newItem;
  
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work")
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render('list', {listTitle: " Work List", newListItems: workItems})
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});