import http from 'http';

const port = 9002; // 4 digit terakhir NIM: 9002

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Server berjalan di port 9002\n');
});

server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
