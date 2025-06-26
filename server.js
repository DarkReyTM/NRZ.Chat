
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { getTwitchMessages, getYouTubeMessages } = require('./aggregator');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('✅ NRZ.Chat WebSocket клиент подключён');
});

async function pollMessages() {
  const twitchMessages = await getTwitchMessages();
  const youtubeMessages = await getYouTubeMessages();
  const allMessages = [...twitchMessages, ...youtubeMessages];

  for (const msg of allMessages) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(String(msg));
      }
    });
  }
}

setInterval(pollMessages, 3000);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`✅ NRZ.Chat сервер работает на http://localhost:${PORT}`);
});
