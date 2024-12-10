const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://maimunaibrahim808:maimoon123@cluster0.xy9tq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongoose connection
mongoose.connect(dbURI, {})
  .then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('COULD NOT CONNECT TO DATABASE:', error.message);
  });

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
//blog routes
app.use('/blogs', blogRoutes);


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
