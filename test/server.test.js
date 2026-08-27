const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('admin can edit navigation and dropdown content', () => {
  const js = fs.readFileSync('src/admin/AdminApp.jsx', 'utf8');
  assert.match(js, /activeTab === 'navigation'/);
  assert.match(js, /handleAddSolutionChild/);
  assert.match(js, /navigation\.solutionGroups/);
});

test('public pages and assets exist', () => {
  ['index.html', 'admin.html', 'src/client/main.jsx', 'src/admin/main.jsx', 'src/client/client.css', 'src/admin/admin.css']
    .forEach((file) => assert.ok(fs.existsSync(file), file));
});

test('Vercel keeps API routes ahead of the SPA fallback', () => {
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  assert.equal(config.outputDirectory, 'dist');
  assert.deepEqual(config.rewrites[0], { source: '/api/:path*', destination: '/api' });
  assert.deepEqual(config.rewrites.at(-1), { source: '/:path*', destination: '/index.html' });
  assert.ok(fs.existsSync('api/index.js'));
});

test('client supports deployed English aliases and dynamic routes', () => {
  const app = fs.readFileSync('src/client/App.jsx', 'utf8');
  ['/solutions', '/products', '/news', '/projects', '/about', '/contact']
    .forEach((route) => assert.match(app, new RegExp(route.replace('/', '\\/'))));
  assert.match(app, /path\.startsWith\('\/news\/'\)/);
});


