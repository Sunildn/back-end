const path = require("path");
const event = require("events");
const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  if (request.url === "/") {
    response.setHeader("Content-Type", "text/html");
    response.write(
      '<html><body><h1>Hello</h1><form action="/form" method="POST"><input type="text" name="message"/><button type="submit">submit</form></body></html> '
    );
    response.end();
  }
  if (request.method === "POST" && request.url === "/form") {
    const body = [];
    request.on("data", (data) => {
      body.push(data);
      console.log(data);
    });

    request.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      fs.appendFileSync("./new/message.txt", parseBody);
      console.log(parseBody);
    });

    response.statusCode = "302";
    response.setHeader("Location", "/");

    response.end();
  }
});

server.listen(7000);
