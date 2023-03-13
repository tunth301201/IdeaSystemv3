const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRoute = require('./routes/user.route');

mongoose.connect('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch((err) => console.log(err));


// Parse incoming JSON requests
app.use(express.json());

// Route middleware for users
app.use('/users', usersRoute);


// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
  