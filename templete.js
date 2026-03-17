const express = require("express");
const path = require("path");

const app = express();

//set EJS as template engine 
app.set("view engine", "ejs");

//optional: set views folder manually
app.set("views", path.join(__dirname, "views"));

//route
app.get("/", (req, res) => {
	const user = "shanmukh";
	const marks = 99;
	res.render("home", {
		name: user,
		score: marks
	});
});
//start server
app.listen(3000, () => {
	console.log("server running on http://localhost:3000");
});