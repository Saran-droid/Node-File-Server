const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Allow CORS for frontend requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Route to handle file writing
app.post('/writefile', (req, res) => {
    const { content } = req.body;

    // Overwrite the file with new content
    fs.writeFile(path.join(__dirname, 'example.txt'), content, (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        res.status(200).send('Content written successfully');
    });
});

// Route to handle reading the file
app.get('/readfile', (req, res) => {
    const filePath = path.join(__dirname, 'example.txt');
    console.log('Reading file from:', filePath);  // Add this line for debugging

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file:', err);  // Log error details
            return res.status(500).send('Error reading the file');
        }
        console.log('File content:', data);  // Log the file content to the console
        res.status(200).send(data);  // Send the content of the file back to the client
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
