const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//show all files
app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render("index", { files });
    }
  });
});

//create
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/new", (req, res) => {
  const fn = req.body.hisaabTitle + ".txt";
  fs.writeFile(`./files/${fn}`, req.body.data, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect("/");
    }
  });
});

//reading
app.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.readFile(`./files/${filename}`, "utf-8", function (err, data) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render("detail", { data, filename });
    }
  });
});

//update
app.get("/edit/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.readFile(`./files/${filename}`, "utf-8", (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render("edit", { filename, data });
    }
  });
});

app.post("/update/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.writeFile(`./files/${filename}`, req.body.fileData, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect("/");
    }
  });
});

//delete
app.get("/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.unlink(`./files/${filename}`, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.redirect("/");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
