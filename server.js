const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer();

server.on('request', (req, res) => {
    let extension = req.url.split(".").pop();
    let store = '';
    req.on('data', (chank) => {
        store += chank;
    });
    req.on('end', () => {
        if (req.url === '/' || req.url === '/index.html') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./index.html').pipe(res);
        }
        else if (req.url === '/speakers.html') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./speakers.html').pipe(res);
        }
        else if (req.url === '/register.html' && req.method === 'GET') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./register.html').pipe(res);
        }
        else if (req.url == '/register' && req.method === 'POST') {
            const data = JSON.stringify(querystring.parse(store));
            const user = JSON.parse(data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(`<h1>hello ${user.name}.</h1> are you register Now. <br /><a href="index.html">go to home</a>`);
            res.end();
        }
        else if (req.url === '/schedule.html') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./schedule.html').pipe(res);
        }
        else if (req.url === '/venue.html') {
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream('./venue.html').pipe(res);
        }
        else if (['jpg'].indexOf(extension) > -1) {
            res.setHeader('Content-Type', `image/${extension}`);
            fs.createReadStream(__dirname + req.url).pipe(res);
        }
        else if (req.url.indexOf('css')) {
            res.setHeader('Content-Type', 'text/css');
            fs.createReadStream(__dirname + req.url).pipe(res);
        }
    })
});

server.listen(3000, () => {
    console.log("start server on 3000");
});