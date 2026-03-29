# AI4City Lab — 内容管理后台

本地运行的零依赖内容管理工具，只需要 Node.js，无需安装任何额外包。

## 🚀 使用方法

### 第一步：将以下文件复制到项目根目录

```
ai4city-website/          ← 你的项目根目录
├── admin-server.js       ← ✅ 复制这个
├── admin/
│   └── index.html        ← ✅ 复制这个（先建 admin 文件夹）
├── start-admin.sh        ← ✅ Mac/Linux 快捷启动
├── start-admin.bat       ← ✅ Windows 快捷启动
├── src/
│   └── data/             ← 数据文件就在这里
└── public/
    └── images/           ← 图片就在这里
```

### 第二步：启动

**Mac / Linux:**
```bash
cd ai4city-website
node admin-server.js
# 或者
bash start-admin.sh
```

**Windows:**
```
双击 start-admin.bat
```

浏览器会自动打开 **http://localhost:3737**

---

## ✨ 功能说明

### 📰 News & Events
- 可视化编辑文章：标题、日期、作者、图片、正文块
- 正文支持「文字段落」和「图片块」的拖拽排序
- 「+ 新建文章」一键创建，「💾 保存所有」写入 articles.js

### 👥 Team 团队
- 浏览和编辑所有成员分类（PI / PhD / Master / RA / Alumni 等）
- 一键添加/删除成员

### 📄 Publications / 🔬 Research / 🗃 Resources
- 统一的卡片式编辑界面
- 支持调整排列顺序、删除、新增

### 🖼 媒体管理
- 左侧选择文件夹（news / seminar / people / research / publication / resource / frontPage）
- 拖拽或点击上传图片/视频，自动保存到对应 `public/images/` 子文件夹
- 点击图片名称自动复制路径（如 `/images/news/xxx.png`），直接粘贴到表单

### 📝 原始编辑器
- 直接编辑 JS 文件源码，适合批量操作
- 每个数据文件都有独立的编辑器

### ▶ Dev / Build
- 顶栏「▶ 启动 Dev」→ 相当于 `npm run dev`，自动在 localhost:5173 预览
- 「⚙ Build」→ 相当于 `npm run build`，生成 dist/ 文件夹
- 终端面板实时查看输出日志

---

## ⚠️ 注意事项

1. 本工具**只在本机运行**，不要暴露到公网
2. 保存数据前建议先用 git commit 备份
3. 如果「解析失败」，请切换到对应的「原始编辑器」直接修改 JS
4. Build 完成后，手动上传 `dist/` 文件夹到华为云 OBS 即可
