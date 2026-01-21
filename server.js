const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use('/', publicRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});