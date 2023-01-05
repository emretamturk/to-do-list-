/* Import NPM ExpressJS Module */
const express = require("express");
const app = express();

/* VARIABLE BLOCK */
let userinputs = ["Go Gym", "Go Shopping", "Go Holiday"];
let todoItems = [];
let userinput = "";

/* Import Body-Parser */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Import EJS */
app.set("view engine", "ejs");

/* GET ROOT */
app.get("/", function (req, res) {
  //res.sendFile(__dirname + "/index.html");

  //Date Information
  let today = new Date();
  let options = { weekday: "long", day: "numeric", month: "long" };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newItem: userinputs });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItem: todoItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

/* POST REQUEST */
app.post("/", function (req, res) {
  userinput = req.body.newItem;
  if (req.body.list === "Work") {
    todoItems.push(userinput);
    res.redirect("/work");
  } else {
    userinputs.push(userinput);
    res.redirect("/");
  }
});

app.post("/work", function (req, res) {
  userinput = req.body.newItem;
  todoItems.push(userinput);
  res.redirect("/work");
});

/* LISTEN PORT TERMINAL*/
app.listen(3000, function () {
  console.log("Server started on Port:3000");
});
