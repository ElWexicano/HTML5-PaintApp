/*
    Application Routes
    Author  : Shane Doyle
    Date    : 31/10/2012
    This file is used to store the routes
    for the application.
*/
module.exports = function(app) {
	
	var title = "Simple Paint App";
	
	// Default Route
	app.get("/", function(req, res) {
		res.render("index.jade", {
			title: title
		});
	});
	
	// Save Route
	app.post("/saveCanvas", function(req, res) {
		var base64Data = req.body.dataURL.replace(/^data:image\/png;base64,/,"");
		
		console.log(base64Data);
		
		var dataBuffer = new Buffer(base64Data, 'base64');

		require("fs").writeFile("out.png", dataBuffer, function(err) {
			console.log(err);
		});
		
		res.writeHead(200, { 'Content-Type' : 'application/json' });
		res.send( JSON.stringify(true) );
	});
	
};
