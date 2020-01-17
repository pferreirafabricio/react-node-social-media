exports.sum = (a, b) => a-b;

const http = require("http");

const server = http.createServer( (req, res) => {
    res.end("Hellow World, with Node.js!");
});

server.listen(3000);
// function sum(a, b)
// {
//     return a+b;
// }

// const sum = (a, b) => {
//     return a+b;
// };

// module.exports = { sum };