// PROTOTYPE ONLY — local static server, not production code.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PROTOTYPE_PORT || 4173);

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const resolved = path.resolve(root, requested);

  if (!resolved.startsWith(root) || !fs.existsSync(resolved)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': resolved.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  fs.createReadStream(resolved).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Low-fi prototype: http://127.0.0.1:${port}/?variant=A`);
});
