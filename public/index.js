
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'backend' folder
app.use(express.static(__dirname));

// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve login.html on /login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Start server
app.listen(3004, () => console.log('Server running on port 3004'));




