var express= require("express");
var config = require('./config');
var bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')

var app = express();
console.log("OUR EXPRESS APP WILL GO HERE!!");

app.use(express.static("public"));
app.use(express.static("views/imgs"));
app.use(bodyParser.urlencoded({extended: true}));   // key-value pairs used with {}
app.set("view engine","ejs");



var Usernames_Passwords = {       //This is a proper dictionary, not the structured one,i.e dict[{key:value}]
    "Prithvi" : "football",
    "Vaibhav" : "barcelona",
    "Chetan"  : "sleep",
    "Manav"   : "pointer",
    "Janavi"  : "coe"
}

//Get functions here
app.get("/",function(req,res){     //Req contains all the information about the request that was made that triggered this route                                            // Res contains the information about what we are going to respond with
    res.render("home");
    // res.sendFile(path.join(__dirname + '/index.htm'))

});

app.get('/video', function(req, res) {
    const path = 'assets/sample.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
  
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1
  
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
  
      res.writeHead(206, head)
      file.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  })

app.get("/fallInLoveWithUsername/:thing",function(req,res){
    thing = req.params.thing;
    res.render("love",{thingVar:thing});
});

app.get("/login",function(req,res){
// res.render("login_home");
    res.render("FinalLogin.ejs");
});

app.get("/Login/new",function(req,res){
    // var LoginInfo = [
    //     "Tony","Edward","Justin","Rose", "DEEZNUTS"
    // ]
    // res.send("This is the correct login id");
    res.render("info",{Usernames_Passwords:Usernames_Passwords});
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



app.post("/login",function(req,res){                        // same route to follow REST
    var checkUsername = req.body.checkUsername;
    var checkPassword = req.body.checkPassword;
    if (`${checkUsername}` in Usernames_Passwords){
            if(Usernames_Passwords[checkUsername] === `${checkPassword}`){
                // res.render("video",{checkUsername:checkUsername,checkPassword:checkPassword});
                res.sendFile(path.join(__dirname + '/index.htm'))
            }
            else{
                res.redirect("/login");
            }    
    }
    else{
        res.redirect("/login");
    }

})
app.post("/Login/new",function(req,res){
    var user = req.body.newUser;
    var password = req.body.newPassword;
    Usernames_Passwords[`${user}`]= `${password}`;
    console.log(req.body);
    // res.send("You have reached the post route");
    res.redirect('/Login/new');

}) 



//listen method here 
app.listen(config.httpPort,function(){
    console.log(`Server has started on ${config.httpPort}`);
});
// console.log(process.env.PORT);
