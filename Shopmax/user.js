//var alert = require('alert-node');
var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');
var fs = require('fs');
var found =0;
var sign_found =1;
var flash = require('req-flash');
var util = require('util')    
var file = 'push.json'



app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  


app.get('/login.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "login.html" );  
}) 


app.get('/signup.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "signup.html" );  
}) 

app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})

app.get('/category.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "category.html" );  
})


app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
}) 




app.get('/contact.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "contact.html" );  
})

 
app.post('/login', urlencodedParser, function (req, res) {  
	var email = req.body.email;
	var password1 = req.body.password1;
   console.log("Email = " + email + "  Password = " + password1);
   
    
    let rawdata = fs.readFileSync('push.json');
    let student = JSON.parse(rawdata);
	console.log("Student"+student);
    for (var i = 0; i < student.length; i++) {
       if(student[i].email==email&&student[i].pwd== password1){
         console.log("succesfull")
         found =1 ;
         
         res.redirect('/index.html');

         break;
       }
	   
      }
	  if(found==0)
	  {
		  console.log("Unsussceesful");
		  //alert("Wrong credentials");
		  res.redirect('/back.html');
	  }
	 
//})  
}) 
  

app.post('/signup', urlencodedParser, function (req, res) { 


response = {  
       email:req.body.email,  
       password1:req.body.pass  
   };  
   console.log(response);
   
fs.readFile('push.json', 'utf8',function(err, fileContent) {
  console.log(fileContent);
  var user = JSON.parse(fileContent)
 


  for (var i = 0; i < user.length; i++) {
     if(user[i].email==response.email&&user[i].pwd== response.password1){
    
      
		console.log("Already Exists");
		sign_found =0;
		//alert("Email Id and password already exists!!!");
		res.redirect('/back1.html');
     
       break;
     }
  }
     if(sign_found ==1)
     {
      user.push({email:response.email,pwd:response.password1});
     
    
  fs.writeFile('push.json', JSON.stringify(user),(err)=>
  {
    if(err)
    {
      console.log(err);
    }
  })
  
  res.redirect('/index.html');
  
	 }
})
})



var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  

