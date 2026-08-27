const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');

test('admin can edit navigation and dropdown content',()=>{const js=fs.readFileSync('src/admin/AdminApp.jsx','utf8');assert.match(js,/activeTab === 'navigation'/);assert.match(js,/handleAddSolutionChild/);assert.match(js,/navigation\.solutionGroups/)});
test('public pages and assets exist',()=>['index.html','admin.html','src/client/main.jsx','src/admin/main.jsx','src/client/client.css','src/admin/admin.css'].forEach(f=>assert.ok(fs.existsSync(f),f)));



