const createServer = require("./server.js");

const app = createServer();

app.listen(process.env.PORT || 8080, function () {
  console.log(`Server is listening on port ${process.env.PORT || 8080}`);
});
