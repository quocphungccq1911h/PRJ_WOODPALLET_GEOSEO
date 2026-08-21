const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Parse URL & remove query strings
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/index.html';
  }

  // Safe path resolution
  const safePath = path.normalize(reqUrl).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(BASE_DIR, safePath);

  // If path is a directory without trailing slash, try index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // If file doesn't have extension and exists with .html, append .html
  if (!fs.existsSync(filePath) && !path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <!DOCTYPE html>
          <html lang="vi">
          <head><meta charset="utf-8"><title>404 Not Found</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #2D5A27;">404 - Không Tìm Thấy Trang</h1>
            <p>Trang <code>${reqUrl}</code> không tồn tại trên server.</p>
            <p><a href="/" style="color: #EA580C; font-weight: bold;">Quay lại Trang Chủ &rarr;</a></p>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log('🌲 PALLET GỖ VIỆT - LOCAL DEV SERVER ĐANG CHẠY');
  console.log(`🌐 URL: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
  console.log('📄 Bấm Ctrl + Click vào link trên để xem giao diện');
  console.log('🛑 Nhấn Ctrl + C để dừng server');
  console.log('======================================================\n');
});