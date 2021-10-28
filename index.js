const http = require('http');
var express = require('express');
var pset = require('./controllers/problems')

var app = express()

app.use(express.static("public"));
app.engine('html', require('ejs').renderFile)

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res){
  res.render(__dirname+'/views/index.ejs',
    {
      page_title:"Gen. Physics 203 Review Problems",
      problem_set: pset.list()
    }
  )
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});