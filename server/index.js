const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const boardRoutes = require('./routes/boardRoutes');
const userRoutes = require('./routes/userRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api/board', boardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/calendar', calendarRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
