var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

app.use(express.static('./public'));

app.post('/api/Remote', urlencodedParser, function(req, res) {
	var currentdate = new Date();
	var datetime = currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1) + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds() + ": " + req.body.data + "\r\n";
	//console.log("/api/Remote");
	fs.appendFile('./public/data.txt', datetime, function (err) {
		if(err) throw err;
		//console.log('Saved!');
	});
    console.log(datetime + ": " + req.body.data);
    res.send('OK');
});

app.listen(1688, function () {
  console.log('Example app listening on port 1688!');
});