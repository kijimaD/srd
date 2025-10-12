const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function listDirectory(dir, basePath = '') {
    const items = [];

    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.join(basePath, entry.name);

            if (entry.isDirectory()) {
                items.push({
                    type: 'directory',
                    name: entry.name,
                    path: relativePath
                });
            } else if (entry.isFile() && entry.name.endsWith('.pdf')) {
                items.push({
                    type: 'file',
                    name: entry.name,
                    path: relativePath
                });
            }
        }
    } catch (error) {
        console.error('Error reading directory:', error);
    }

    return items.sort((a, b) => {
        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
        return a.name.localeCompare(b.name);
    });
}

app.get('/api/browse', (req, res) => {
    const requestedPath = req.query.path || '.';
    const baseDir = path.join(__dirname, 'pdfs');

    // Security: prevent directory traversal
    const safePath = path.normalize(requestedPath).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.resolve(baseDir, safePath);

    // Ensure the path is within the pdfs directory
    if (!absolutePath.startsWith(baseDir)) {
        return res.status(403).json({ error: 'Access denied' });
    }

    if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({ error: 'Directory not found' });
    }

    const stat = fs.statSync(absolutePath);
    if (!stat.isDirectory()) {
        return res.status(400).json({ error: 'Not a directory' });
    }

    const items = listDirectory(absolutePath, safePath);
    res.json({
        currentPath: safePath,
        items: items
    });
});

app.get('/api/pdf/*', (req, res) => {
    const requestedPath = req.params[0];
    const baseDir = path.join(__dirname, 'pdfs');
    const safePath = path.normalize(requestedPath).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.resolve(baseDir, safePath);

    // Security check
    if (!absolutePath.startsWith(baseDir)) {
        return res.status(403).send('Access denied');
    }

    if (!fs.existsSync(absolutePath)) {
        return res.status(404).send('File not found');
    }

    res.sendFile(absolutePath);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
