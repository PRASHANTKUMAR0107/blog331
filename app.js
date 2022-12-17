const express = require("express");
const bodyParser = require("body-parser");
var _ = require("lodash");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://prashantkumar010704:Prashant123@cluster0.0av29iq.mongodb.net/?retryWrites=true&w=majority");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const composeSchema=mongoose.Schema({
  title:String,
  body:String
});
const compoCollection = mongoose.model("compoCollection",composeSchema);

// const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "A blog website just for fun";
const contactContent = "contact room no: 331@2021";
// let composeObjs=[{title:"AANA",body:homeStartingContent}];
let dataBase;
app.get("/",function(req,res){
  compoCollection.find({},function(err,foundItem){
    if(!err)
    {
      dataBase=foundItem;
      res.render("home",{contentObj:dataBase});
    }
  })
})

app.get("/about",function(req,res){
  res.render("about",{content:aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{content:contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/posts/:anything",function(req,res){
  let any = (req.params.anything);
  // any = _.capitalize(any);
  console.log(any);
  // composeObjs.forEach(function(A){
  //   let a=A.title;
  //   a=_.lowerCase(a);
  //   if(a===any) {
  //     // console.log("match found!");
  //     res.render("post",{content:A})
  //   }
  // })
  compoCollection.find({_id: any},function(err,foundItem){
    if(!err){
      // console.log(foundItem);
      if(!foundItem[0])
      {
        res.redirect("/");
      }
      else
      {
        res.render("post",{content:foundItem[0]});
      }
    }
  })
    // else console.log("No Match");
  
})

app.post("/compose",function(req,res){
  // console.log(req.body.contentTitle);
  let composeObj=new compoCollection({
    title:(req.body.contentTitle),
    body:req.body.contentBody
  });
  composeObj.save();
  // composeObjs.push(composeObj);
  // console.log(composeObjs);
  compoCollection.find({},function(err,foundItem){
    if(!err)
    {
      dataBase=foundItem;
      res.redirect("/");
    }
  })
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
