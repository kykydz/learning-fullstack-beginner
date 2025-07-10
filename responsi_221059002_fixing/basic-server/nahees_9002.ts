const http = require('http');

const portNahees = 9002;

const server = http.createServer((req: any, res: any) => {
  if (req.method === 'PATCH' && req.url === '/counter') {
    let body = '';

    req.on('data', (chunk: any) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (typeof data !== 'object' || Array.isArray(data)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Body harus berupa JSON object' }));
          return;
        }

        const incremented: Record<string, number> = {};
        for (const key in data) {
          if (typeof data[key] === 'number') {
            incremented[key] = data[key] + 1;
          } else {
            incremented[key] = data[key];
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(incremented));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Body harus JSON valid' }));
      }
    });

  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server berjalan di port 9002\n');
  }
});

server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
