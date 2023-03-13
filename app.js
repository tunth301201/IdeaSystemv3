const http = require('http');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch((err) => console.log(err));


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!');
  });
  
  server.listen(4000, () => {
    console.log('Server listening on port 4000');
  });

  