var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var ejs = require("ejs")

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "quiz_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//RESTFUL ROUTES
// Index Route
app.get("/",function(req,res){
  res.render("index");
});

// NEW Route
app.get("/quiz",function(req, res) {
  connection.query("SELECT * FROM titles;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { quotes: data });});
  
});

//All quiz display route
app.get("/quiz/allquiz",function(req, res) {
  connection.query("SELECT * FROM titles;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("allquiz", { quotes: data });});
  
});

/////Displays all Quiz to be deleted
app.get("/quiz/allquizdelete",function(req, res) {
  connection.query("SELECT * FROM titles;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("delete", { delet: data });});
  
});


// NEW ROUTE
app.get("/quiz/new",function(req, res) {
    res.render("new");
});
//Create route
app.post("/quiz",function(req,res){
 
  connection.query("insert into titles (title,description) values(?,?) ",[req.body.quizname,req.body.Quizdescription], function(err, data) {
    if (err) {
      return res.status(500).send("err");
    }
    var title_id = data.insertId;
/////////////Question 1
     connection.query(" insert into questions (title_id,question) values(?,?) ",[title_id,req.body.question1], function(err, data) {
    if (err) {
       return res.status(500).end();
     }
   var question_id = data.insertId;
     connection.query(" insert into answers (questions_id,answer1,answer2,answer3,answer4,title_id,correct) values(?,?,?,?,?,?,?) ",[question_id,req.body.Aanswer1,req.body.Aanswer2,req.body.Aanswer3,req.body.Aanswer4,title_id,req.body.correct1], function(err, data) {
    if (err) {
       return res.status(500).end();
     }
   
   
   ///////////////Question 2
  connection.query(" insert into questions (title_id,question) values(?,?) ",[title_id,req.body.question2], function(err, data) {
    if (err) {
      return res.status(500).end();
      }
  var question2_id = data.insertId;
      connection.query(" insert into answers (questions_id,answer1,answer2,answer3,answer4,title_id,correct) values(?,?,?,?,?,?,?) ",[question2_id,req.body.Banswer1,req.body.Banswer2,req.body.Banswer3,req.body.Banswer4,title_id,req.body.correct2], function(err, data) {
    if (err) {
      return res.status(500).end();
      }
      
      });
 
  /////////////Question 3
  connection.query(" insert into questions (title_id,question) values(?,?) ",[title_id,req.body.question3], function(err, data) {
    if (err) {
      return res.status(500).end();
      }
  var question3_id = data.insertId;
      connection.query(" insert into answers (questions_id,answer1,answer2,answer3,answer4,title_id,correct) values(?,?,?,?,?,?,?) ",[question3_id,req.body.Canswer1,req.body.Canswer2,req.body.Canswer3,req.body.Canswer4,title_id,req.body.correct3], function(err, data) {
    if (err) {
      return res.status(500).end();
      }

   
      });

  });
 
  //////////////QUestion 4
 
  connection.query(" insert into questions (title_id,question) values(?,?) ",[title_id,req.body.question4], function(err, data) {
    if (err) {
      return res.status(500).end();
      }
  var question4_id = data.insertId;
      connection.query(" insert into answers (questions_id,answer1,answer2,answer3,answer4,title_id,correct ) values(?,?,?,?,?,?,?) ",[question4_id,req.body.Danswer1,req.body.Danswer2,req.body.Danswer3,req.body.Danswer4,title_id,req.body.correct4], function(err, data) {
    if (err) {
      return res.status(500).end();
      }
  
      });
      });
  });
     });
 });
  })
  res.redirect('/quiz/allquiz');
});

//SHOW a specific quiz

app.get("/quiz/:id",function(req,res){
  connection.query(" SELECT t.title_id, q.questions_id,q.question,t.title,t.description,answer1,answer2,answer3,answer4  FROM questions q left join titles t  on(q.title_id=t.title_id) left join answers a on(a.questions_id =  q.questions_id) WHERE q.title_id =?",[parseInt(req.params.id)], function(err, data) {
    if (err) {
      return res.status(500).end();
    }
  res.render("showquiz", { question: data });});
});

app.get("/quiz/:id/edit",function(req,res){
  res.render("edit")
})

/////////////////////THE DELETE route
//DELETE titles,questions,answers FROM titles INNER JOIN questions INNER JOIN answers ON titles.title_id= questions.title_id=answers.title_id WHERE titles.title_id=?
app.get("/quiz/delete/:id",function(req,res){
  console.log(req.params.id);
  connection.query("DELETE FROM titles WHERE title_id =?;", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
    
    connection.query("DELETE FROM questions WHERE title_id =?;", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
    
     connection.query("DELETE FROM answer WHERE title_id =?;", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
    
     })
    });

  });
})
///// Post route for submitting results of quiz to Database
app.post("/quiz/results",function(req,res){
  
 var timeid = req.body.timeid;
 //res.json((req.body["answer0"]).split(","));
var id = req.body["answer0"].split(",")[0];
var response = req.body["answer0"].split(",")[1];

  connection.query("insert into userresponse (timeid,response,question_id ) values(?,?,?) ",[timeid,response,id ], function(err, data) {
    if (err) {
      return res.status(500).send("err");
    }
  
    })
   ////////INSERT question 2 
   var id2 = req.body["answer1"].split(",")[0];
var response2 = req.body["answer1"].split(",")[1];

   connection.query("insert into userresponse (timeid,response,question_id ) values(?,?,?) ",[timeid,response2,id2 ], function(err, data) {
    if (err) {
      return res.status(500).send("err");
    }
    }) 
 ////////INSERT question 3 
   var id3 = req.body["answer2"].split(",")[0];
var response3 = req.body["answer2"].split(",")[1];
   connection.query("insert into userresponse (timeid,response,question_id ) values(?,?,?) ",[timeid,response3,id3 ], function(err, data) {
    if (err) {
      return res.status(500).send("err");
    }
    }) 
 ////////INSERT question 4 
   var id4 = req.body["answer3"].split(",")[0];
var response4 = req.body["answer3"].split(",")[1];
   connection.query("insert into userresponse (timeid,response,question_id ) values(?,?,?) ",[timeid,response4,id4 ], function(err, data) {
    if (err) {
      return res.status(500).send("err");
    }
    })
    var valery = "/time/" + timeid
    res.redirect(valery);
   })
app.get("/time/:timeid",function(req,res){
 console.log(req.params.timeid);
  connection.query("SELECT answers.questions_id,answers.correct,userresponse.response FROM answers INNER JOIN userresponse ON answers.questions_id=userresponse.question_id WHERE userresponse.timeid = ? ",[req.params.timeid],function(err, result) {
   console.log(result)
   res.render("quizResults", { result: result });
   
  })
  
})
      
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
