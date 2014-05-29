var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');

var app = express();

app.use(bodyParser());

app.post('/file/:filename', function(req, res) {
  if(req.body.hasOwnProperty('data') || req.body.hasOwnProperty('file') || req.body.hasOwnProperty('url')|| req.hasOwnProperty('name')){
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  } 
  req.pipe(fs.createWriteStream("./app/files/" + req.params.filename));
  fs.writeFile("app/files/" + req.body.name, req.body.file, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log(req.body + req.body.name + req.body.file);
    }
}); 
  res.json(req.body.name);
});

app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8000;

app.listen(port, function() {
	console.log('listening on', port);
});