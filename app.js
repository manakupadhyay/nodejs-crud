const express = require('express');
const bodyParser = require('body-parser');

// importing person from person.js
var person = require('./person.js')

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('index');
});

app.get('/read', function(req,res){
  person.find(function(err,persons){
    if(err){
      console.log(err);
    }else if(persons.length == 0){
      res.send("No People");
    }else{
      res.render('read',{people:persons});
    }
  });
});

app.use('/delete', function(req,res){
  var id = req.query.id;
  person.findOne({_id:id},function(err,p){
    if(err){
      console.log(err);
    }else{
      res.render("confirmDelete",{person:p});
    }
  });
});

app.use('/confirmDelete', function(req,res){
  person.deleteOne({_id:req.query.id}, function(err){
    if(err){
      console.log(err);
    }else{
      //res.send("<h2> Successfully Deleted </h2>");
      res.redirect('/read');
    }
  });
})


app.use('/person', function(req,res){
    var id = req.query.id;
    person.findOne({_id: id}, function(err,person){
        if(err){
          console.log(err);
        }else if(!person){
          console.log("No persons named");
        }else{
          res.render("update",{person:person});
        }
    });
});

app.post('/update',function(req,res){
  //var ObjectID = require('mongodb').ObjectID;
  person.updateOne({"_id":(req.body.userid)},{$set: {"name":req.body.username,"age":req.body.userage,"subject":req.body.usersubject}},function(err,p){
    if(err){
      console.log(err);
    }else{
      res.render('updated',{person:p});
    }
  });
});

app.get('/create', function(req,res){
  res.render('form');
});

app.post('/formsubmit',function(req,res){

    var body = req.body;
    var personObject = new person({
        name: body.username,
        age: body.userage,
        subject: body.usersubject
    });
    personObject.save( (err) =>{
        if(err){
          res.type('html').status(500);
          res.send("Error: "+ err);
          console.log(err);
        }else{
          res.render('formsubmitted',{person:personObject});
        }
    });
});


app.listen(3000,function(){
    console.log("Listening to port 3000");
});

// DEMO CODE...
// app.use('/formsubmit',function(req,res){
//     var body = req.body;
//     console.log(body);
//     var name = body.username;
//     var age = body.age;
//     res.render('formsubmitted',{username:name,userage:age});
//
// });
