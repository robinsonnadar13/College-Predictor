var express = require('express');
var app = express();
var fs = require('fs');


var cors = require('cors');
app.use(cors());


app.use(express.static('public'));
// const ResultPage = require('./views/ResultPage.ejs');
// app.use("/all/:gate/:cgpi/:internships/:branch",ResultPage);

var university;
var exists = fs.existsSync('university.json');
var txt = fs.readFileSync('university.json', 'utf8');
university = JSON.parse(txt);

var server = app.listen(process.env.PORT || 3000, listen);

app.get('/all/:gate/:cgpi/:internships/:branch', addinfo);

// app.get("/all/:gate/:cgpi/:internships/:branch", (req, res) => {
//         res.render("ResultPage");
// });

app.post('/all/:gate/:cgpi/:internships/:branch', showAll);

function addinfo(req, res) {

  ans = []
  var gate = Number(req.params.gate);
  var cgpi = Number(req.params.cgpi);
  var branch = req.params.branch;
  var internships = Number(req.params.internships);

  storecgpi = req.params.cgpi;
  storegate = req.params.gate;
  storeinternships = req.params.internships;

  var userdata = {
    status: 'success',
    gate: gate,
    cgpi: cgpi,
    branch: branch,
    internships: internships
  }
  console.log('Data given by user: ' + JSON.stringify(userdata));
  showAll(req, res, userdata);
}

function showAll(req, res, userdata) {

  if(storecgpi >= 8 && storegate <= 600){
      tiermsg = "You fall under Tier 1."
  }
  else if(storecgpi >= 7 && storegate <= 5722){
      tiermsg = "You fall under Tier 2."
  }
  else{
      tiermsg = "You fall under Tier 3."
  }

  for (i = 0; i < university.length; i++) {
    if(university[i].cgpi <= userdata.cgpi && university[i].gate_rank >= userdata.gate){
    ans[i] = " " + university[i].college_name + " ";
    }
  }

  if(storeinternships < 2){
      internmsg = "It is recommended to have atleast 2 internships since completing internships increases the chances of getting selected by 16%"
  }
  else{
      internmsg = "You have completed " + storeinternships + " internships, you are good to go."
  }
  var filtered = ans.filter(function (el) {
    return el != null;
  });

  console.log(filtered)
  collegelist = "These are some of the college you are most probable to get : " + filtered;

  res.send('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>College Predictor</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"><link rel="icon" href="data:image/png;base64,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"><script src="libraries/p5.js" type="text/javascript"></script><script src="libraries/p5.dom.js" type="text/javascript"></script><script src="sketch.js" type="text/javascript"></script><style>body {padding: 20px;}</style></head><body><h1>Predicted Results</h1><br /><br /><div class="alert alert-primary" role="alert">' + tiermsg + '</div><br /><div class="alert alert-warning" role="alert">' + collegelist + '</div><br /><div class="alert alert-info" role="alert">' + internmsg + '</div></body></html>');
}

app.get('/university', show);

function show(req,res){
  res.send(university);
}

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
