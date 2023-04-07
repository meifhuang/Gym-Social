const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/home', (req, res) => {
    res.json({
        message: 'Gym Social'
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
