var express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
var mysql = require("mysql");
var app = express();
let ejs = require('ejs');
var nodemailer = require("nodemailer");
var router = express.Router();
require('dotenv').config({path: '.env'});
/*--------------------Routing Start----------------------------*/


app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/ha.html");
});

app.get('/ha.html', function(req, res) {
  res.sendFile(__dirname + "/views/ha.html");
});

app.get('/pandp.html', function(req, res) {
  res.sendFile(__dirname + "/views/pandp.html");
});

app.get('/termscondition.html', function(req, res) {
  res.sendFile(__dirname + "/views/termscondition.html");
});

app.get('/forget_password.html', function(req, res) {
  res.sendFile(__dirname + "/views/forget_password.html");
});

app.get('/login.html', function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get('/getintouch.html', function(req, res) {
  res.sendFile(__dirname + "/getintouch.html");
});
// connection with database

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.dbpassword,
  database: process.env.database,
});
connection.connect(function(err) {
  if (!err) {
    console.log("DB Connection Succeeded");
  }
  console.log(err);
});

app.post('/getintouch', function(req, res, next) {

  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone_no;
  var message = req.body.message;

  var mailOptions, host, link;
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kamalchudasama6@gmail.com",
      pass: process.env.emailpass
    }
  });
  //joballindia@gmail.com
  var mailOptions = {
    to: "kamalchudasama6@gmail.com",
    subject: "Website Query Box- Get in Touch  || HumanAsset",
    html: "<span style='font-weight:15px; font-size:15px;'>Website Query Box- Get in Touch  || HumanAsset</span> <br><div style='margin-top:10px;'><span>Name- </span> <span>" + name + "</span><br><span>Email- </span><span>" + email + "</span><br><span>Phone- </span><span>" + phone + "</span><br><span>Message- </span><span> " + message + "</span></div>"
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    }
    res.redirect('/ha.html');
    console.log("Succeeded");
  });

});


app.get('/blog', function(req, res) {
  var blog = 'SELECT *FROM newblog';

  connection.query(blog, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.render('blog.ejs', {
      data: result
    });
  });
});


app.post('/email', function(req, res, next) {

  global.rand = Math.floor(100000 + Math.random() * 900000);
  console.log(rand);
  var mailOptions, host, link;
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kamalchudasama6@gmail.com",
      pass: process.env.emailpass
    }
  });

  var mailOptions = {
    to: "kamalchudasama6@gmail.com",
    subject: "Please send your otp ",
    html: "Hello,<br> Please tell OTP to the admin to get your email verify.<br><br><h1> " + rand + "</h1>"
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log(done);
    }
  });
});

app.post('/otp', function(request, response) {
  console.log(rand);
  var otp = request.body.otp;
  if (rand != otp) {
    response.send("otp isn't match");
  }

  if (rand == otp) {
    response.sendfile(__dirname + '/views/forget_password.html');
  }

});

app.post('/forget', function(req, res, next) {
  var newpass = req.body.newpass;
  var confpass = req.body.confipass;
  var passquery = 'update forowner set passwords="' + confpass + '" where email = "joballindia@gmail.com";'

  connection.query(passquery, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log("inserted");
    res.redirect('/blog')
  });

});


app.post('/login', function(req, res, next) {

  var email = req.body.email;
var password = req.body.password;

  var search = 'select* from forowner where email= "' + email + '" and passwords="' + password + '"';

  var query = 'INSERT INTO forowner(email,passwords) values ("' + email + '","' + password + '")';

  // search for the email wether it is exists or not

  connection.query(search, function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data.length);
    if (data.length != 0) {
      res.redirect('/blog');
    } else if (true) {
      connection.query(query, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("inserted");
        }
      });
    } {
      res.sendfile(__dirname + "/error.html");
    }
  });


});

app.post('/newblogs', function(req, res, next) {

  var title = req.body.title;
  var description = req.body.desc;

  var blogquery = 'INSERT INTO newblog(title,descriptions) values ("' + title + '","' + description + '")';

  connection.query(blogquery, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log("inserted");
    res.redirect('/blog')
  });

});

app.get('/presentrequirment', function(req, res) {
  var blog = 'SELECT *FROM newblog';
  connection.query(blog, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.render('presentrequirment', {
      data: result
    });
  });
});


app.post('/delete', function(req, res, next) {
  var title = req.body.deletetitle;
  var deleteblog = 'delete from newblog where title = "' + title + '"';
  connection.query(deleteblog, function(err, data) {
    if (err) {
      console.log(err);
    }

    res.redirect('/blog');
  });
});

app.post('/update', function(req, res, next) {
  var previoustitle = req.body.previoustitle;
  var title = req.body.updatetitle;
  var descriptions = req.body.updatedescriptions;

  var updateblog = 'update newblog set title = "' + title + '", descriptions = "' + descriptions + '" where title="' + previoustitle + '"';
  connection.query(updateblog, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.redirect('/blog');
  });
});


/*--------------------Routing Over----------------------------*/

app.listen(3000, function() {
  console.log("Express Started on Port 3000");
});
