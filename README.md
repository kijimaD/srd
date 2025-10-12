# PDF Theater

PDFをスライド形式で読むためのポータブルビューア。

## Docker で起動

### イメージをpull

```
# 起動
docker run -d --name srd-server \
  --restart unless-stopped \
  -p 8015:8000 \
  -v $(pwd):/app/pdfs \
  ghcr.io/kijimad/srd:main
```

### ローカルでビルド

```bash
# イメージをビルド
docker build -t srd-dev .

# 起動
docker run -d --name srd-dev \
  --restart unless-stopped \
  -p 8015:8000 \
  -v $(pwd):/app/pdfs \
  srd-dev
```

### ファイル構成

- **イメージに含まれる**: index.html, server.js, node_modules, public/
- **マウントされる**: カレントディレクトリ → /app/pdfs（PDFファイルをここに配置）

## 開発

```bash
npm install
npm start
```
