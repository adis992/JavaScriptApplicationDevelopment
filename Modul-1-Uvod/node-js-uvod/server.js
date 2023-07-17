const http = require('http');
//require je funkcija koja prima string i vraca modul koji je definisan u tom stringu

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {  //req - request, res - response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
