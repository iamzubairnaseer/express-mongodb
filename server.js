const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const User = require("./User");
const Resu = require("./Restaurant");
const Menu = require("./Menu");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
   extended: true
}));

mongoose.connect("mongodb+srv://zubair:zubair123@cluster0-clyyy.mongodb.net/test?retryWrites=true&w=majority", 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.log(err);
    })

// Add body parser
app.use(bodyParser.json());

app.get("/signup/",(req,res) => {
    res.send("Get api at root.");
});

app.post("/signup", (req, res) => {
    // creating new user from User model

    User.findOne({email:req.body.email},(err,data) => {

		if(data){

            res.send({"User":"User Already Exist"})

        }else{

            const newUser = new User({
                firstName: req.body.firstName,
                lastName:  req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password
            });

            // console.log(req.body);
            // console.log(newUser);

            newUser.save()
                .then((user) => {
                    res.json(user) // Sending back new user data
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});

app.post('/login',(req, res) => {
	//console.log(req.body);
	User.findOne({email:req.body.email},(err,data) => {

        if(data){
			
			if(data.password==req.body.password){
                //console.log("Done Login");
                res.json(data);
            
			}else{
				res.send({"Success":"Wrong password!"});
            }

		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

app.post('/res',(req,res) => {

    const newRes = new Resu({
        resName: req.body.resName,
        resDesc: req.body.resDesc,
        resCat: req.body.resCat,
        resMinOrder: req.body.resMinOrder,
        resDevPrice: req.body.resDevPrice
    });

    newRes.save()
        .then((resu) => {
            res.json(resu) // Sending back new user data
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/res/menu:restaurant',(req,res) => {
    // console.log(req.params.restaurant)
    const newMenu = new Menu({
        resName: req.params.restaurant,
        menuName: req.body.menuName,
        menuCat: req.body.menuCat,
        menuDesc: req.body.menuDesc,
        menuPrice: req.body.menuPrice
    });

    newMenu.save()
        .then((menu) => {
            res.json(menu)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/res',(req,res) => {
    
    Resu.find({},(err,data) => {

        if(data){
            res.json(data);
        }else{
            res.send({"Response":"No Restaurant Found"});
        }
    })
});

app.get('/res/menu:restaurant',(req,res) => {

    // console.log(req.params.restaurant);

    Menu.find({resName:req.params.restaurant},(err,data) => {
        if (data){
            res.json(data);
        }else{
            res.json({"Response":"No Menu Found"});
        }
    })
});

app.get('/res/:Search',(req,res) => {

    Resu.findOne({resName:req.params.Search},(err,data) => {
        
        if(data){
            res.json(data);
        }else{
            res.send({"Response":"No Restaurant Found"});
        }
    })
});

app.listen(3030, (req,res)=>{
    console.log(`running on port 3030`);
})