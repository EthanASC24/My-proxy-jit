const express = require('express');
const axios = require('axios');
const app = express();

// Use the port the hosting service gives us, or 3000 for local testing
const PORT = process.env.PORT || 3000;

// The Home Page
app.get('/', (req, res) => {
    res.send('<h1>Proxy is Online</h1><p>Usage: /view?url=https://google.com</p>');
});

// The Proxy Engine
app.get('/view', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.send("Please add a URL, like /view?url=https://bing.com");

    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 5000 // Stops the request if the site takes too long
        });
       
        res.set('Content-Type', 'text/html');
        res.send(response.data);
    } catch (error) {
        res.status(500).send("Proxy Error: " + error.message);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
