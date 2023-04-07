const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.get('/hi', (req, res) => {
    res.json({
        message: 'Hello from Express!'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
