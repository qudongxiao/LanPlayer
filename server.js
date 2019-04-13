var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();  
app.use("/static", express.static(__dirname + '\\static'));

var videoPath = __dirname + "\\static\\videos\\";

console.log("Read the file: " + videoPath);

var videoList = [];

function getVideoInfo(path) {
    try {
		var files = fs.readdirSync(path);
		for (var i in files) {
				if (/mp4$/.test(files[i])) {
					videoList[videoList.length]={
						name: files[i],
						url: (videoPath.replace(__dirname, "")+ files[i]).replace(/\\/g, '/'), 
						mtime: fs.statSync(path+""+files[i]).mtime
					}
				}
		}
	}
    catch (e) {
        console.log(e)
	}
}


app.get('/index', function (req, res) {
	res.sendFile(__dirname + "\\" + "index.html");
});


function reGetFileInfos() {
	videoList = [];
	getVideoInfo(videoPath); 
} 

app.get('/api/vlist', function (req, res) {
	res.json(videoList);
});
 

http.createServer(app).listen('5000', function () {
	reGetFileInfos();
	console.log(' The server is running at 5000 ');
});
