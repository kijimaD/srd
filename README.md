# PDF Theater

PDFをスライド形式で読むためのビューア

## Docker で起動

### ローカルでビルド

```bash
# イメージをビルド
docker build -t pdf-theater .

# 起動
docker run -d --name pdf-theater \
  --restart unless-stopped \
  -p 8013:8013 \
  -v $(pwd):/app/pdfs \
  pdf-theater
```

### ファイル構成

- **イメージに含まれる**: index.html, server.js, node_modules, public/
- **マウントされる**: カレントディレクトリ → /app/pdfs（PDFファイルをここに配置）

## 開発

```bash
npm install
npm start
```
