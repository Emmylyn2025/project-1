require('dotenv').config();
const express = require('express')
const connectTodatabse = require('./databse/db');
const router = require('./routes/route')
const cors = require('cors')

const app = express();

//Connect to databse
connectTodatabse();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api/project', router);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is now runnig at ${PORT}`);
});