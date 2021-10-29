var express = require('express');

var conf = require('./config')
var pset = require('./controllers/problems')

var routes = require('./routes')

pset.init()

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));
app.engine('html', require('ejs').renderFile)

routes.generate(app)

app.get('/', function(req, res){
  listOfPsets = pset.list()
  res.render(__dirname+'/views/index.ejs',
    {
      page_title:conf.page_name,
      problem_set: listOfPsets,
    }
  )
})

app.listen(conf.port, conf.hostname, () => {
  console.log(`Server running at http://${conf.hostname}:${conf.port}/`);
});