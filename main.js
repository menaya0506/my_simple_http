var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('./public'));

app.get('/getfile', function (req, res) {
	res.sendFile('D:/Dev doc/Scripts/simple_http/ccs.zip');
});

// Test
app.get('/api/nowtime', function (req, res) {
	console.log(JSON.stringify(req.headers));
	res.send('Hello World!');
});

var LimitStream = require("./LimitStream.js");
const path = require('path');
var mime = require('mime-types');
const fs = require('fs');
app.get('/dw', function(req, res) {
	var file = 'D:/Dev doc/Scripts/simple_http/public/ccs.zip';
	var stats = fs.statSync(file);
	var fileSizeInBytes = stats["size"];

	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);
	res.setHeader('Content-Length', fileSizeInBytes);

	var filestream = fs.createReadStream(file);
	var limitStream = new LimitStream();
	limitStream.setLimit(1024);
	limitStream.on('pause', function() {
		filestream.pause();
	});
	limitStream.on('resume', function() {
		if(!req.aborted) {
			filestream.resume();
		} else {
			filestream.unpipe();
		}
	});
	filestream.pipe(limitStream).pipe(res);
});




app.post('/api/Remote', urlencodedParser, function(req, res) {
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1) + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();
	//console.log("/api/Remote");
    console.log(datetime + ": " + req.body.data);
    res.send('hello world');
});

app.post('/api/bpas/mos/record/c0581bba-bcc7-4eab-ad31-cc109d9ab940', urlencodedParser, function(req, res) {
    console.log(req.body.data);
	console.log("/api/bpas/mos/record/c0581bba-bcc7-4eab-ad31-cc109d9ab940");
	console.log();
    res.send('Ok');
});

app.post('/api/bpas/mos/health/c0581bba-bcc7-4eab-ad31-cc109d9ab940', urlencodedParser, function(req, res) {
    console.log(req.body.data);
	console.log("/api/bpas/mos/health/c0581bba-bcc7-4eab-ad31-cc109d9ab940");
	console.log();
    res.send('Ok');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});