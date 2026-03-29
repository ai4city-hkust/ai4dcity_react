@echo off
REM AI4City Admin — Windows 启动脚本
REM 双击运行即可
echo 启动 AI4City 内容管理后台...
node "%~dp0admin-server.cjs"
pause
