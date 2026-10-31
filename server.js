const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize path
  let filePath = path.join(ROOT, pathname);

  // Try finding the file with various candidates
  const candidates = [];

  // If path is root '/'
  if (pathname === '/' || pathname === '') {
    candidates.push(path.join(ROOT, 'index.html'));
  } else {
    // 1. Direct path
    candidates.push(filePath);
    // 2. Directory with index.html (e.g. /services -> /services/index.html)
    candidates.push(path.join(filePath, 'index.html'));
    // 3. Flat HTML (e.g. /services -> /services.html)
    candidates.push(filePath + '.html');
    // 4. Asset lookup if path starts with /images/ or /sites/ or /assets/
    if (pathname.startsWith('/images/')) {
      candidates.push(path.join(ROOT, 'framerusercontent.com', pathname));
      candidates.push(path.join(ROOT, 'assets', pathname));
    }
    if (pathname.startsWith('/sites/')) {
      candidates.push(path.join(ROOT, 'framerusercontent.com', pathname));
      candidates.push(path.join(ROOT, 'assets', pathname));
    }
  }

  let foundFile = null;
  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      foundFile = cand;
      break;
    }
  }

  if (foundFile) {
    const ext = path.extname(foundFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(foundFile).pipe(res);
  } else {
    // 404 handler
    const notFoundPage = path.join(ROOT, '404.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPage).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Sightwork Agent Studio (Clone) is running!`);
  console.log(`  Local URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});

