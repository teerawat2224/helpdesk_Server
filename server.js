
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const { handleError, notFound } = require('./middlewares/error');
const authRouter = require('./routes/auth-route');
const userRouter = require('./routes/user-route');
const adminRouter = require('./routes/admin-route');
const technicianRouter = require('./routes/technician-route'); 

const app = express();

// ไม่จำเป็นต้องเรียก dotenv.config() ซ้ำที่นี่

app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/technician', technicianRouter);

app.use('*', notFound);
app.use(handleError);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
