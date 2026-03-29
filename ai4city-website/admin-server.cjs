#!/usr/bin/env node
/**
 * AI4City Lab — Local Admin Server
 * 放在项目根目录，运行: node admin-server.js
 * 浏览器打开: http://localhost:3737
 *
 * 功能:
 *  - 可视化编辑所有数据文件 (articles, team, publications, research, resources)
 *  - 拖拽上传图片/视频到对应的 public/images/ 子文件夹
 *  - 一键 npm run dev / npm run build
 *  - 实时显示终端输出
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const url = require('url');

const PORT = 3737;
const PROJECT_ROOT = __dirname; // admin-server.js 所在目录 = 项目根目录
const SRC_DATA = path.join(PROJECT_ROOT, 'src', 'data');
const PUBLIC_IMAGES = path.join(PROJECT_ROOT, 'public', 'images');

// ─── 媒体文件夹映射 ──────────────────────────────────────────────────────────
const MEDIA_FOLDERS = {
  news: 'news',
  seminar: 'seminar',
  people: 'people',
  research: 'research',
  publication: 'publication',
  resource: 'resource',
  frontPage: 'frontPage',
};

// ─── MIME ────────────────────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.jfif': 'image/jpeg',
};

// ─── Helper: parse multipart/form-data ───────────────────────────────────────
function parseMultipart(body, boundary) {
  const parts = [];
  const boundaryBuf = Buffer.from('--' + boundary);
  let start = 0;

  while (start < body.length) {
    const bIdx = indexOfBuffer(body, boundaryBuf, start);
    if (bIdx === -1) break;
    start = bIdx + boundaryBuf.length;
    if (body[start] === 45 && body[start + 1] === 45) break; // --boundary--

    // skip \r\n
    if (body[start] === 13) start += 2;

    // find header end
    const headerEnd = indexOfBuffer(body, Buffer.from('\r\n\r\n'), start);
    if (headerEnd === -1) break;
    const headerStr = body.slice(start, headerEnd).toString();
    start = headerEnd + 4;

    // find next boundary
    const nextBound = indexOfBuffer(body, boundaryBuf, start);
    const dataEnd = nextBound === -1 ? body.length : nextBound - 2; // -2 for \r\n
    const data = body.slice(start, dataEnd);
    start = nextBound;

    // parse headers
    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const filenameMatch = headerStr.match(/filename="([^"]+)"/);
    const ctMatch = headerStr.match(/Content-Type:\s*(.+)/i);

    parts.push({
      name: nameMatch ? nameMatch[1] : '',
      filename: filenameMatch ? filenameMatch[1] : null,
      contentType: ctMatch ? ctMatch[1].trim() : 'text/plain',
      data,
    });
  }
  return parts;
}

function indexOfBuffer(buf, search, offset = 0) {
  for (let i = offset; i <= buf.length - search.length; i++) {
    let match = true;
    for (let j = 0; j < search.length; j++) {
      if (buf[i + j] !== search[j]) { match = false; break; }
    }
    if (match) return i;
  }
  return -1;
}

// ─── Helper: read body ───────────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

// ─── Data file helpers ───────────────────────────────────────────────────────
const DATA_FILES = {
  articles: 'articles.js',
  team: 'team.js',
  publications: 'publications.js',
  research: 'research.js',
  resources: 'resources.js',
  navigation: 'navigation.js',
  research_field: 'research_field.js',
};

// 每个数据文件对应的导出变量名
const EXPORT_NAMES = {
  articles: 'ARTICLE_CONTENT',
  team: 'TEAM_DATA',
  publications: 'PUBLICATION_ITEMS',
  research: 'RESEARCH_PROJECTS',
  resources: 'RESOURCES_LIST_ITEMS',
  navigation: 'NAV_LINKS',
  research_field: 'HOME_RESOURCES_ITEMS',
};

function readDataFile(name) {
  const filePath = path.join(SRC_DATA, DATA_FILES[name]);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

function writeDataFile(name, content) {
  const filePath = path.join(SRC_DATA, DATA_FILES[name]);
  fs.writeFileSync(filePath, content, 'utf-8');
  return true;
}

/**
 * 服务端解析：用 Node.js 动态 import() 直接加载 ES Module 数据文件
 * 返回真正的 JS 对象，彻底避免浏览器端 eval 的各种问题
 * 加时间戳 ?t=xxx 参数强制绕过 Node 模块缓存，每次都重新读文件
 */
async function parseDataFile(name) {
  const filePath = path.join(SRC_DATA, DATA_FILES[name]);
  if (!fs.existsSync(filePath)) return null;
  // 构造 file:// URL，Windows 需要三斜杠
  const fileUrl = 'file:///' + filePath.replace(/\\/g, '/') + '?t=' + Date.now();
  try {
    const mod = await import(fileUrl);
    const exportName = EXPORT_NAMES[name];
    if (mod[exportName] !== undefined) return mod[exportName];
    if (mod.default !== undefined) return mod.default;
    // fallback: 返回第一个导出值
    const keys = Object.keys(mod);
    return keys.length ? mod[keys[0]] : null;
  } catch (e) {
    console.error(`[parseDataFile] Failed to import "${name}":`, e.message);
    return null;
  }
}

// ─── List images in a folder ─────────────────────────────────────────────────
function listImages(folder) {
  const dir = path.join(PUBLIC_IMAGES, folder);
  if (!fs.existsSync(dir)) return [];
  const files = [];
  function walk(d, prefix) {
    fs.readdirSync(d).forEach(f => {
      const full = path.join(d, f);
      const rel = prefix ? prefix + '/' + f : f;
      if (fs.statSync(full).isDirectory()) {
        walk(full, rel);
      } else {
        const ext = path.extname(f).toLowerCase();
        if (['.jpg','.jpeg','.png','.gif','.webp','.svg','.mp4','.jfif'].includes(ext)) {
          files.push({ name: rel, path: '/images/' + folder + '/' + rel });
        }
      }
    });
  }
  walk(dir, '');
  return files;
}

// ─── Running processes ───────────────────────────────────────────────────────
let devProcess = null;
let buildProcess = null;
const processLogs = { dev: [], build: [] };

function runNpm(cmd) {
  const key = cmd; // 'dev' or 'build'
  processLogs[key] = [];

  if (key === 'dev' && devProcess) {
    devProcess.kill();
    devProcess = null;
  }

  const proc = spawn('npm', ['run', cmd], {
    cwd: PROJECT_ROOT,
    shell: true,
  });

  if (key === 'dev') devProcess = proc;
  else buildProcess = proc;

  proc.stdout.on('data', d => {
    processLogs[key].push({ type: 'out', text: d.toString() });
    if (processLogs[key].length > 200) processLogs[key].shift();
  });
  proc.stderr.on('data', d => {
    processLogs[key].push({ type: 'err', text: d.toString() });
    if (processLogs[key].length > 200) processLogs[key].shift();
  });
  proc.on('close', code => {
    processLogs[key].push({ type: 'sys', text: `\n[Process exited with code ${code}]\n` });
  });

  return proc.pid;
}

// ─── HTTP Server ─────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  function json(data, status = 200) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  // ── Serve admin UI ──────────────────────────────────────────────────────
  if (pathname === '/' || pathname === '/index.html') {
    const uiPath = path.join(__dirname, 'admin', 'index.html');
    if (fs.existsSync(uiPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(uiPath));
    } else {
      res.writeHead(404); res.end('Admin UI not found. Place admin/index.html next to admin-server.js');
    }
    return;
  }

  // ── Serve public images (proxy) ─────────────────────────────────────────
  if (pathname.startsWith('/images/')) {
    const imgPath = path.join(PUBLIC_IMAGES, pathname.replace('/images/', ''));
    if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
      const ext = path.extname(imgPath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(imgPath).pipe(res);
    } else {
      res.writeHead(404); res.end('Image not found');
    }
    return;
  }

  // ── API: list data file names ───────────────────────────────────────────
  if (pathname === '/api/data-files' && req.method === 'GET') {
    json(Object.keys(DATA_FILES));
    return;
  }

  // ── API: get raw JS content ─────────────────────────────────────────────
  if (pathname.startsWith('/api/data/') && req.method === 'GET') {
    const name = pathname.replace('/api/data/', '');
    const content = readDataFile(name);
    if (content === null) { json({ error: 'File not found' }, 404); return; }
    json({ name, content });
    return;
  }

  // ── API: parse & return JS data as JSON (server-side, no browser eval) ──
  // GET /api/parsed/articles  → returns { ok:true, data: ARTICLE_CONTENT }
  if (pathname.startsWith('/api/parsed/') && req.method === 'GET') {
    const name = pathname.replace('/api/parsed/', '');
    if (!DATA_FILES[name]) { json({ error: 'Unknown data file' }, 400); return; }
    const data = await parseDataFile(name);
    if (data === null) {
      json({ ok: false, error: `Failed to parse ${name}.js — check server console for details` }, 500);
    } else {
      json({ ok: true, data });
    }
    return;
  }

  // ── API: save raw JS content ────────────────────────────────────────────
  if (pathname.startsWith('/api/data/') && req.method === 'POST') {
    const name = pathname.replace('/api/data/', '');
    const body = await readBody(req);
    const { content } = JSON.parse(body.toString());
    writeDataFile(name, content);
    json({ ok: true });
    return;
  }

  // ── API: list media folders ─────────────────────────────────────────────
  if (pathname === '/api/media/folders' && req.method === 'GET') {
    json(Object.keys(MEDIA_FOLDERS));
    return;
  }

  // ── API: list images in folder ──────────────────────────────────────────
  if (pathname.startsWith('/api/media/list/') && req.method === 'GET') {
    const folder = pathname.replace('/api/media/list/', '');
    json(listImages(folder));
    return;
  }

  // ── API: upload media ───────────────────────────────────────────────────
  if (pathname.startsWith('/api/media/upload/') && req.method === 'POST') {
    const folder = decodeURIComponent(pathname.replace('/api/media/upload/', ''));
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)/);
    if (!boundaryMatch) { json({ error: 'No boundary' }, 400); return; }
    const boundary = boundaryMatch[1];
    const body = await readBody(req);
    const parts = parseMultipart(body, boundary);
    const saved = [];

    for (const part of parts) {
      if (!part.filename) continue;
      const targetDir = path.join(PUBLIC_IMAGES, folder);
      fs.mkdirSync(targetDir, { recursive: true });
      const targetPath = path.join(targetDir, part.filename);
      fs.writeFileSync(targetPath, part.data);
      saved.push({ name: part.filename, path: '/images/' + folder + '/' + part.filename });
    }
    json({ ok: true, saved });
    return;
  }

  // ── API: delete media file ──────────────────────────────────────────────
  if (pathname.startsWith('/api/media/delete') && req.method === 'POST') {
    const body = await readBody(req);
    const { filePath } = JSON.parse(body.toString());
    // filePath like /images/news/xxx.png
    const absolute = path.join(PUBLIC_IMAGES, filePath.replace('/images/', ''));
    if (fs.existsSync(absolute)) { fs.unlinkSync(absolute); }
    json({ ok: true });
    return;
  }

  // ── API: npm run dev / build ────────────────────────────────────────────
  if (pathname === '/api/npm/dev' && req.method === 'POST') {
    const pid = runNpm('dev');
    json({ ok: true, pid });
    return;
  }
  if (pathname === '/api/npm/stop-dev' && req.method === 'POST') {
    if (devProcess) { devProcess.kill(); devProcess = null; }
    json({ ok: true });
    return;
  }
  if (pathname === '/api/npm/build' && req.method === 'POST') {
    const pid = runNpm('build');
    json({ ok: true, pid });
    return;
  }

  // ── API: get logs ───────────────────────────────────────────────────────
  if (pathname.startsWith('/api/npm/logs/') && req.method === 'GET') {
    const key = pathname.replace('/api/npm/logs/', '');
    const since = parseInt(parsed.query.since || '0');
    const logs = (processLogs[key] || []).slice(since);
    json({ logs, total: (processLogs[key] || []).length });
    return;
  }

  // ── API: get all image paths for autocomplete ───────────────────────────
  if (pathname === '/api/media/all' && req.method === 'GET') {
    const all = [];
    Object.keys(MEDIA_FOLDERS).forEach(folder => {
      listImages(folder).forEach(f => all.push(f.path));
    });
    json(all);
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n✅  AI4City Admin Server running at http://localhost:${PORT}\n`);
  console.log(`   Project root: ${PROJECT_ROOT}`);
  console.log(`   Data files:   ${SRC_DATA}`);
  console.log(`   Media root:   ${PUBLIC_IMAGES}\n`);

  // Auto-open browser
  const openCmd = process.platform === 'darwin' ? 'open' :
                  process.platform === 'win32'  ? 'start' : 'xdg-open';
  exec(`${openCmd} http://localhost:${PORT}`);
});
