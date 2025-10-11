const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8012;

app.use(express.static('.'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/public', express.static('public'));

app.get('/api/pdfs', (req, res) => {
    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        return res.json([]);
    }

    const files = fs.readdirSync(publicDir)
        .filter(file => file.endsWith('.pdf'))
        .sort();

    res.json(files);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});
