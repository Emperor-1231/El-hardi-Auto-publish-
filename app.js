const express = require('express');
const path = require('path');

const app = express();

// Serve public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve views folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));