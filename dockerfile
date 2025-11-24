# --- 使用官方 Node.js 22 LTS 作為基底 ---
FROM node:22.17.1

# 設定工作目錄
WORKDIR /app

# 複製專案（不包含 node_modules）
COPY . .

# 移除 node_modules（確保乾淨）
RUN rm -rf node_modules

# 更新系統
RUN apt-get update

# 更新 npm
RUN npm install -g npm@latest

# 安裝 dependencies
RUN npm install --loglevel=error

# 安裝 Medusa CLI
RUN npm install -g @medusajs/medusa-cli@latest

# build
RUN npx medusa build

# --- 進入 .medusa/server 安裝 server 依賴 ---
WORKDIR /app/.medusa/server
RUN npm install

# ❗ 不要 COPY .env
# Render 會自動把 ENV 變數寫進容器中

# --- 啟動命令 ---
CMD ["npm", "start"]
