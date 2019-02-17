var express= require("express");
var config = require('./config');
var bodyParser = require("body-parser");

var app = express();
console.log("OUR EXPRESS APP WILL GO HERE!!");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));   // key-value pairs used with {}
app.set("view engine","ejs");


var LoginInfo = [
    "Tony","Edward","Justin","Rose", "DEEZNUTS"
]

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
    // var LoginInfo = [
    //     "Tony","Edward","Justin","Rose", "DEEZNUTS"
    // ]
    // res.send("This is the correct login id");
    res.render("info",{LoginInfo:LoginInfo});
});
app.get("/Password",function(req,res){
    res.send("This is the correct Password");
});

app.post("/addUser",function(req,res){
    var newUser = req.body.newUser;
    LoginInfo.push(newUser);
    console.log(req.body);
    // res.send("You have reached the post route");
    res.redirect('/Login');

})

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
