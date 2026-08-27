const http = require('http');
const fs = require('fs');
const path = require('path');
const { connectDB, getSiteData, updateSiteData, createItem, updateItem, deleteItem, updateSetting } = require('./db');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC = path.join(__dirname, 'dist');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin123';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

let db = null;

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(body);
}
function json(res, status, value) { send(res, status, JSON.stringify(value), types['.json']); }
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', c => { raw += c; if (raw.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(raw || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}
function valid(data) {
  return data && typeof data === 'object' && data.brand && data.hero && Array.isArray(data.services) && Array.isArray(data.projects) &&
    data.navigation && Array.isArray(data.navigation.items) && Array.isArray(data.navigation.solutionGroups);
}
async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] === 'api') {
    const collections = ['services', 'projects', 'stats', 'process'];

    // GET /api/site
    if (parts.length === 2 && parts[1] === 'site' && req.method === 'GET') {
      try {
        const data = await getSiteData(db);
        return json(res, 200, data);
      } catch (e) {
        return json(res, 500, { error: 'Không thể đọc dữ liệu từ database.' });
      }
    }

    // POST /api/auth/verify
    if (parts.length === 3 && parts[1] === 'auth' && parts[2] === 'verify' && req.method === 'POST') {
      try {
        const body = await readBody(req);
        if (body.token === ADMIN_TOKEN) {
          return json(res, 200, { valid: true });
        } else {
          return json(res, 401, { error: 'Mã quản trị không đúng.' });
        }
      } catch (e) {
        return json(res, 400, { error: 'Yêu cầu không hợp lệ.' });
      }
    }

    // Auth check wrapper for all modification operations
    const isAuthorized = req.headers.authorization === `Bearer ${ADMIN_TOKEN}`;
    if (!isAuthorized && req.method !== 'GET') {
      return json(res, 401, { error: 'Mã quản trị không đúng.' });
    }

    // PUT /api/settings/:key
    if (parts.length === 3 && parts[1] === 'settings' && req.method === 'PUT') {
      const key = parts[2];
      const validKeys = ['brand', 'navigation', 'hero', 'cta', 'contact', 'seo'];
      if (!validKeys.includes(key)) {
        return json(res, 400, { error: 'Cấu hình không hợp lệ.' });
      }
      try {
        const body = await readBody(req);
        const updatedAt = await updateSetting(db, key, body);
        return json(res, 200, { ok: true, updatedAt });
      } catch (e) {
        return json(res, 400, { error: 'Dữ liệu không hợp lệ.' });
      }
    }

    // POST /api/:collection
    if (parts.length === 2 && collections.includes(parts[1]) && req.method === 'POST') {
      const col = parts[1];
      try {
        const body = await readBody(req);
        const item = await createItem(db, col, body);
        return json(res, 201, item);
      } catch (e) {
        return json(res, 400, { error: 'Không thể tạo mới phần tử.' });
      }
    }

    // PUT /api/:collection/:id
    if (parts.length === 3 && collections.includes(parts[1]) && req.method === 'PUT') {
      const col = parts[1];
      const id = parts[2];
      try {
        const body = await readBody(req);
        const item = await updateItem(db, col, id, body);
        return json(res, 200, item);
      } catch (e) {
        return json(res, 400, { error: 'Không thể cập nhật phần tử.' });
      }
    }

    // DELETE /api/:collection/:id
    if (parts.length === 3 && collections.includes(parts[1]) && req.method === 'DELETE') {
      const col = parts[1];
      const id = parts[2];
      try {
        await deleteItem(db, col, id);
        return json(res, 200, { ok: true });
      } catch (e) {
        return json(res, 400, { error: 'Không thể xóa phần tử.' });
      }
    }

    return json(res, 404, { error: 'Không tìm thấy API này.' });
  }

  let pathnameStatic = decodeURIComponent(url.pathname);
  if (pathnameStatic === '/') pathnameStatic = '/index.html';
  if (pathnameStatic === '/admin' || pathnameStatic === '/admin/') pathnameStatic = '/admin.html';
  const publicRoutes = ['/giai-phap', '/san-pham', '/du-an', '/tin-tuc', '/ve-tagtech', '/lien-he'];
  if (publicRoutes.includes(pathnameStatic.replace(/\/$/, ''))) pathnameStatic = '/index.html';
  if (/^\/tin-tuc\/[^/]+\/?$/.test(pathnameStatic)) pathnameStatic = '/index.html';
  const file = path.normalize(path.join(PUBLIC, pathnameStatic));
  if (!file.startsWith(PUBLIC)) return send(res, 403, 'Forbidden', 'text/plain');
  try {
    const stat = await fs.promises.stat(file);
    if (!stat.isFile()) throw new Error();
    return send(res, 200, await fs.promises.readFile(file), types[path.extname(file)] || 'application/octet-stream');
  } catch { return send(res, 404, 'Not found', 'text/plain; charset=utf-8'); }
}

async function start() {
  try {
    db = await connectDB();
    http.createServer(handler).listen(PORT, () => console.log(`TAGTECH running at http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}
start();
