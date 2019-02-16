var express= require("express");
var config = require('./config');

var app = express();
console.log("OUR EXPRESS APP WILL GO HERE!!");

app.use(express.static("public"));
app.set("view engine","ejs");


//Get functions here
app.get("/",function(request,response){     //Req contains all the information about the request that was made that triggered this route                                            // Res contains the information about what we are going to respond with
    // response.send("Welcome to SecuNet!");
    response.render("home");
});
app.get("/fallInLoveWithUsername/:thing",function(req,res){
    thing = req.params.thing;
    res.render("love",{thingVar:thing});
});
app.get("/Login",function(req,res){
    res.send("This is the correct login id");
});
app.get("/Password",function(req,res){
    res.send("This is the correct Password");
});
app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal.toLowerCase();
    var soundDict = {
        cow : "Moo",
        pig : "Oink",
        dog : "woof",
        cat : "I rule the world",
        goldfish : "..."
    };
    if (animal in soundDict){
        res.send("The "+ animal + " says " + soundDict[animal] );
    }
    else{
        res.send("Please match with key values- cow,pig,dog,cat,goldfish")
    }
});
app.get("/posts", function(req,res){
    var posts= [                                    //Array of posts
        {title: "Post 1", author: "Suzy"},
        {title: "My adorable pet bunny", author: "Charlie"},                           
        {title: "Can you believe this pomsky", author : "Colt"}                              
    ];
    res.render("posts",{posts: posts})

});

app.get("*", function(req,res){
    res.send("Wrong input");
});




//listen method here 
app.listen(config.httpPort,function(){
    console.log(`Server has started on ${config.httpPort}`);
});
// console.log(process.env.PORT);
