const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRoute = require('./routes/user.route');
const ideasRoute = require('./routes/idea.route');
const userIdeasRoute = require('./routes/userIdea.route');
const { conn } = require('./config/db');

// mongoose.connect('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to database'))
// .catch((err) => console.log(err));


// Parse incoming JSON requests
app.use(express.json());

// Route middleware for users
app.use('/users', usersRoute);

// Route middleware for ideas
app.use('/ideas', ideasRoute);

// Route middleware for user-ideas
app.use('/userIdeas', userIdeasRoute);


// Start the server
conn.once('open', () => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
  