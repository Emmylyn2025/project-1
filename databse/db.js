const mongoose = require('mongoose');

const connectTodatabse = async() => {
  try{

    await mongoose.connect(process.env.DATABASE_CONN);
    console.log('Database connection successful');

  } catch(error) {
    console.log('Error while uploading to databse', error);
  }
}

module.exports = connectTodatabse;