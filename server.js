const http = require('http');
const port = 3000;

const requestHandler = (req, res) => {
  res.end('Hello, World from Node.js server!');
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong', err);
  }
  console.log(`Server is listening on ${port}`);
});
