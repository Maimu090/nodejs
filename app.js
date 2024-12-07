const express = require("express");
const morgan = require("morgan");
const blog = require('./models/blog');
const dbURI = 'mongodb+srv://admin:test123@cluster0.0z039.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))


.catch((err) => console.log(err));



const mongoose = require('mongoose');
// express app
const app = express();

//register view engine
app.set("view engine", "ejs");



app.use(express.static("public"));



app.use(morgan("dev"));

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })

  app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
  })
})


app.get("/", (req, res) => {
   const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render("index", { title: "Home", blogs });
});



app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects
app.get("/about-me", (req, res) => {
  res.render("/about", { title: "About" });
});

app.get('/blogs/create', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
