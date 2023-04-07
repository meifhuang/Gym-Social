const express = require('express');
require('dotenv').config();
const path = require('path');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const AppError = require('./utils/AppError');
const catchAsync = require('./utils/CatchAsync')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const router = express.Router();



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

const sessionConfig = {
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 ^ 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate())); //comes from passportlocalmongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware
app.use((req, res, next) => {
    console.log(req.body);
    next();
})

app.get('/home', (req, res) => {
    res.json({
        message: 'Gym Social'
    });
});

app.get('/register', (req, res) => {
    res.json(
        { messsage: "Hi" })
})

app.post('/register', catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password);
    console.log("Successfully registered",)
    res.redirect('/home')
    // req.login(registeredUser, err => {
    //     if (err) return next(err);
    //     console.log('success')
    //     res.redirect('/home')
    // })
}))

app.get('/login', (req, res) => {
    res.json({
        message: "Login"
    })
})

app.post('/login', passport.authenticate('local'), (req, res) => {

})

// app.get('/login', (req, res))

//if none of the routes prior to this matches

app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
})


//note : eventually create an error template page?
app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(status).send({ err });
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
