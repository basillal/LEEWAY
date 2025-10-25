const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8081;

app.use(
    cors({
        credentials: true,
        'Access-Control-Allow-Origin': '*',
        origin: '*',
    })
);
/// Serve the kjsdc application
app.use('/', express.static(path.join(__dirname, '/dist/shell')));

app.get('*/', (req, res) => {
    if (req.path.endsWith('.js')) {
        res.sendFile(path.resolve(__dirname, '/dist/shell' + req.path));
    } else {
        res.sendFile(path.resolve(__dirname, 'dist/shell/index.html'));
    }
});
// Start the server
const server = http.createServer(app);
server.listen(port, 'localhost', () => console.log('Running...'));
// server.listen(port, "0.0.0.0", () => console.log("Running..."));
