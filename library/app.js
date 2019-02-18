var express= require("express");
var config = require('./config');
var bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')

var app = express();
console.log("OUR EXPRESS APP WILL GO HERE!!");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));   // key-value pairs used with {}
app.set("view engine","ejs");


var LoginInfo = [
    "Tony","Edward","Justin","Rose", "DEEZNUTS"
]
var Usernames_Passwords = {
    "Prithvi" : "Football",
    "Vaibhav" : "Barcelona",
    "Chetan"  : "Sleep",
    "Manav"   : "Pointer",
    "Janavi"  : "COE"
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

app.get("/Login",function(req,res){
res.render("login_home");
});

app.get("/testLogin",function(req,res){
    // var LoginInfo = [
    //     "Tony","Edward","Justin","Rose", "DEEZNUTS"
    // ]
    // res.send("This is the correct login id");
    res.render("info",{LoginInfo:LoginInfo});
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



app.post("/verifyUser",function(req,res){
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
app.post("/addUser",function(req,res){
    var newUser = req.body.newUser;
    var password = req.body.newPassword;
    LoginInfo.push(newUser);
    
    console.log(req.body);
    // res.send("You have reached the post route");
    res.redirect('/testLogin');

})



//listen method here 
app.listen(config.httpPort,function(){
    console.log(`Server has started on ${config.httpPort}`);
});
// console.log(process.env.PORT);
