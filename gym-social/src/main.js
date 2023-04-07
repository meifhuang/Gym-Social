const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.set('strictQuery', false)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection err:"));
db.once("open", () => {
    console.log("database connected");
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(mongoSanitize());


app.get('/home', (req, res) => {
    res.json({
        message: 'Gym Social'
    });
});

app.get('/register', (req, res) => {
    res.json(
        { messsage: "Hi" })
})

app.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        const user = new User({ email })
        await user.save()
        res.redirect('/home');
    }
    catch {
        console.log(err);
    }
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
