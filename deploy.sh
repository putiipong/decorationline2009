#!/bin/bash

# ---------------------------
# Config ส่วนที่ต้องแก้เอง
# ---------------------------
APP_DIR="/home/ec2-user/decorationline2009"  # <<== Path project ของคุณ
GIT_BRANCH="main"                           # <<== Branch ที่จะ pull
PM2_PROCESS_NAME="nextjs15-app"              # <<== ชื่อ PM2 process ของคุณ
NODE_VERSION="18"                            # <<== ใช้ node version ไหน (20 หรือ 22 ก็ได้)

# ---------------------------
# เริ่ม deploy 🚀
# ---------------------------
echo "=============================="
echo "🚀 Start Deploying: $(date)"
echo "=============================="

# ไปที่โฟลเดอร์โปรเจกต์
cd $APP_DIR || { echo "❌ Cannot find app directory: $APP_DIR"; exit 1; }

# ดึง Source Code จาก Git
echo "👉 Pull latest code from branch: $GIT_BRANCH"
git fetch origin
git reset --hard origin/$GIT_BRANCH

# ใช้ Node version ให้ตรง
echo "👉 Using Node.js version: $NODE_VERSION"
. ~/.nvm/nvm.sh  # ถ้าใช้ nvm (optional ถ้ามีติดตั้งไว้)
nvm use $NODE_VERSION || echo "⚠️  Node version switch failed, using system default."

# ติดตั้ง Dependency
if command -v pnpm >/dev/null 2>&1; then
  echo "👉 Installing dependencies with pnpm"
  pnpm install
else
  echo "👉 Installing dependencies with npm"
  npm install
fi

# Build Next.js
echo "👉 Building project..."
npm run build

# Restart PM2
echo "👉 Restarting PM2 process: $PM2_PROCESS_NAME"
pm2 reload $PM2_PROCESS_NAME

# Renew SSL Cert
echo "👉 Renewing SSL certificates (if needed)"
sudo certbot renew --quiet

# Reload nginx
echo "👉 Reloading nginx"
sudo systemctl reload nginx

# Finish
echo "=============================="
echo "✅ Deploy Finished: $(date)"
echo "=============================="
